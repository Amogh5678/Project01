
// When a user logs out, their token is added to the blackListToken collection to prevent further use.

// Without this, JWT tokens would remain valid until their expiration, even if the user logged out.


const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);