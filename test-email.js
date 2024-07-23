const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'sana31xx@gmail.com', // Replace with your test recipient email
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js'
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error('Failed to send email:', err);
    } else {
        console.log('Email sent:', info.response);
    }
});
