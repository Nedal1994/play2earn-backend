const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        admin.password = hashedPassword;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;

        await admin.save();
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
