const Admin = require('../models/admin');

// Get Admin Profile
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'profile_pic_url']; // Add other fields as necessary
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        updates.forEach(update => {
            admin[update] = req.body[update];
        });
        await admin.save();
        res.json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// // Request Password Reset
// exports.requestPasswordReset = async (req, res) => {
//     try {
//         const admin = await Admin.findOne({ email: req.body.email });
//         if (!admin) {
//             return res.status(404).json({ error: 'Admin not found' });
//         }

//         const token = crypto.randomBytes(32).toString('hex');
//         admin.resetPasswordToken = token;
//         admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         await admin.save();

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL, // Your email
//                 pass: process.env.EMAIL_PASSWORD // Your email password
//             }
//         });

//         const mailOptions = {
//             to: admin.email,
//             from: process.env.EMAIL,
//             subject: 'Password Reset',
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//             Please click on the following link, or paste this into your browser to complete the process:\n\n
//             http://localhost:5001/reset/${token}\n\n
//             If you did not request this, please ignore this email and your password will remain unchanged.\n`
//         };

//         transporter.sendMail(mailOptions, (err, response) => {
//             if (err) {
//                 console.error('There was an error: ', err);
//                 return res.status(500).json({ error: 'Failed to send email' });
//             } else {
//                 return res.status(200).json({ message: 'Password reset email sent' });
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//     try {
//         const admin = await Admin.findOne({
//             resetPasswordToken: req.params.token,
//             resetPasswordExpires: { $gt: Date.now() }
//         });

//         if (!admin) {
//             return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
//         }

//         admin.password = req.body.password;
//         admin.resetPasswordToken = undefined;
//         admin.resetPasswordExpires = undefined;

//         await admin.save();
//         res.status(200).json({ message: 'Password has been reset' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
