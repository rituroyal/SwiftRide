// utils/sendOtp.js
const nodemailer = require('nodemailer');
require('dotenv').config();
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
module.exports.sendOtp = async (phone) => {
  try {
    const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: `+91${phone}`, channel: 'sms' });

    console.log("OTP sent:", verification.status);
    return verification.status;
  } catch (error) {
    console.error("Twilio send error:", error.message);
    throw new Error("Failed to send OTP");
  }
};

module.exports.mail = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SwiftRide " <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent successfully:", info);
    return info;
  } catch (err) {
    console.error("Mail sending failed:", err);
    return err.message;
  }
};



