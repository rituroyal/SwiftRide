const mongoose = require('mongoose');
const { mail } = require("../utils/sendOtp.js");
const otpTemplate = require("../template/EmailVerification.js");

const OtpSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
  Otp: {
    type: String,
    required: true,
  }
});

async function verification(Email, Otp) {
  try {
    const mailResponse = await mail(Email, "Verification Email From StudyNotion", otpTemplate(Otp));
    console.log("Mail Sent Successfully", mailResponse);
  } catch (err) {
    console.log("Error occurred while sending mail:", err.message);
    throw err;
  }
}

OtpSchema.pre("save", async function (next) {
  await verification(this.Email, this.Otp);
  next();
});

const OTP = mongoose.model("OTP", OtpSchema);
module.exports = OTP;
