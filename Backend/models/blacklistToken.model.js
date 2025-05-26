// JWT token blacklisting ka use isliye hota hai taaki logout ke baad ya security ke case me us token ko invalid banaya ja sake.
const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 24 hours in seconds
  }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
