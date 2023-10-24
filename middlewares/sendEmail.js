const nodemailer = require('nodemailer');

// Configure nodemailer with your email service provider's settings
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    auth: {
        user: process.env.AUTHEMAIL,
        pass: process.env.AUTHPASSWORD
    }
});

// Function to send an email with the specified subject and message
const sendEmail = (to, subject, otp) => {
    const htmlMessage = `
    <div style="font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2">
   <div style="margin:50px auto;width:100%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">IndPlatform</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing IndPlatform. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />IndPlatform</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
         <p>IndPlatform Inc</p>
         <p>1600 Amphitheatre Parkway</p>
         <p>California</p>
      </div>
    </div>
    </div>
    `;

    const mailOptions = {
        from: process.env.AUTHEMAIL,
        to,
        subject,
        html: htmlMessage,
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