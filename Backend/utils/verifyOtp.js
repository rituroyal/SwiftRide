
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const verifyOtp = async (phone, code) => {
  try {
    const fullPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    console.log("📲 Verifying:", fullPhone, "with code:", code);

    const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: fullPhone, code });

    console.log("✅ Twilio status:", verificationCheck.status);

    return verificationCheck.status === 'approved';
  } catch (error) {
    console.error("❌ OTP verification failed:", error.message);
    return false;
  }
};

module.exports = verifyOtp;
