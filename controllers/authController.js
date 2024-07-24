const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Admin = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

// Register User
exports.registerUser = async (req, res) => {
    const { username, email, password, profile_pic_url } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profile_pic_url,
            tasks_completed: 0,
            total_rewards: 0
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { username, email, password, profile_pic_url } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            profile_pic_url
        });

        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Email or password is wrong' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ error: 'Email or password is wrong' });

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Admin login attempt: email=${email}, password=${password}`);

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log(`Admin not found: ${email}`);
            return res.status(400).json({ error: 'Email or password is wrong' });
        }

        const validPass = await bcrypt.compare(password, admin.password);
        if (!validPass) {
            console.log(`Invalid password for admin: ${email}`);
            return res.status(400).json({ error: 'Email or password is wrong' });
        }

        const token = jwt.sign({ _id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).json({ token, admin });
    } catch (error) {
        console.log(`Admin login error: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

// Request Password Reset for User
exports.requestUserPasswordReset = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const mailOptions = {
            to: user.email,
            from: EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/reset-password/user/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('There was an error: ', err);
                return res.status(500).json({ error: 'Failed to send email' });
            } else {
                return res.status(200).json({ message: 'Password reset email sent' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Reset User Password
exports.resetUserPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        await user.setPassword(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Request Password Reset for Admin
exports.requestAdminPasswordReset = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await admin.save();

        const mailOptions = {
            to: admin.email,
            from: EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/reset-password/admin/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('There was an error: ', err);
                return res.status(500).json({ error: 'Failed to send email' });
            } else {
                return res.status(200).json({ message: 'Password reset email sent' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Reset Admin Password
exports.resetAdminPassword = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        await admin.setPassword(req.body.password);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;

        await admin.save();
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
