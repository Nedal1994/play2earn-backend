const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Hardcoded email credentials
const EMAIL = 'playearnai.noreply@gmail.com';
const EMAIL_PASSWORD = 'htcspcsiaiykuklx';

// Request Password Reset for User
exports.requestUserPasswordReset = async (req, res) => {
    try {
        console.log('Request received:', req.body);

        const db = mongoose.connection.useDb('passwordreset');
        const User = db.model('User', require('../models/User').schema);

        const user = await User.findOne({ email: req.body.email });
        console.log('User found:', user);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();
        console.log('User updated with token:', token);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset-password/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('There was an error:', err);
                return res.status(500).json({ error: 'Failed to send email', details: err });
            } else {
                console.log('Email sent:', response);
                return res.status(200).json({ message: 'Password reset email sent' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Request Password Reset for Admin
exports.requestAdminPasswordReset = async (req, res) => {
    try {
        console.log('Request received:', req.body);

        const db = mongoose.connection.useDb('passwordreset');
        const Admin = db.model('Admin', require('../models/Admin').schema);

        const admin = await Admin.findOne({ email: req.body.email });
        console.log('Admin found:', admin);

        if (!admin) {
            console.log('Admin not found');
            return res.status(404).json({ error: 'Admin not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await admin.save();
        console.log('Admin updated with token:', token);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: admin.email,
            from: EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset-password/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('There was an error:', err);
                return res.status(500).json({ error: 'Failed to send email', details: err });
            } else {
                console.log('Email sent:', response);
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
        const db = mongoose.connection.useDb('passwordreset');
        const User = db.model('User', require('../models/User').schema);

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

// Reset Admin Password
exports.resetAdminPassword = async (req, res) => {
    try {
        const db = mongoose.connection.useDb('passwordreset');
        const Admin = db.model('Admin', require('../models/Admin').schema);

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
