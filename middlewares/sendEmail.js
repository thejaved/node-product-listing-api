const nodemailer = require('nodemailer');

// Configure nodemailer with your email service provider's settings
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'else.greenholt64@ethereal.email',
        pass: 'fuEzE3YXXRT5mZQv3Y'
    }
});

// Function to send an email with the specified subject and message
const sendEmail = (to, subject, message) => {
    const mailOptions = {
        from: 'leora.jaskolski@ethereal.email', // Sender's email address
        to, // Recipient's email address
        subject,
        text: message,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                reject(false);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    });
};

module.exports = sendEmail;