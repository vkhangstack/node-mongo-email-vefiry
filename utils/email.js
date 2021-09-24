const nodemailer = require('nodemailer');
// with mailhog service
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: '127.0.0.1',
      port: '1025',
      auth: {
        user: 'user',
        pass: 'password',
      },
    });

    await transporter.sendMail({
      from: 'mailhog@localhost.com',
      to: email,
      subject: subject,
      text: text,
    });
    transporter.close();
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email not sent');
  }
};

module.exports = sendEmail;
