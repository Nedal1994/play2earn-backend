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
    to: 'sanaayub286@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Failed to send email:', error);
    }
    console.log('Email sent:', info.response);
});
