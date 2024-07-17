require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer with Gmail SMTP'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error.message);
        return;
    }
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
});
