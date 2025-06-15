// utils/sendOtp.js
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOtp = async (phone) => {
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

module.exports = sendOtp;
