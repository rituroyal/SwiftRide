
const sendOtp = require('../utils/sendOtp');
const verifyOtp = require('../utils/verifyOtp');

// Dummy token generator (replace with real JWT if needed)
const generateDummyToken = (phone) => {
  return `token-for-${phone}`;
};

const sendOtpController = async (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  try {
    await sendOtp(phone);
    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtpController = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ error: 'Phone and OTP code required' });
  }

  const isValid = await verifyOtp(phone, code);

  if (isValid) {
    // ✅ Send dummy user and token for frontend
    const user = {
      phone,
      fullname: { firstname: 'User' }  // Replace with actual DB data later
    };

    const token = generateDummyToken(phone);

    res.status(200).json({
      message: 'OTP verified successfully',
      user,
      token
    });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

module.exports = { sendOtpController, verifyOtpController };
