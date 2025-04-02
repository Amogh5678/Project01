import mongoose from 'mongoose'

// When a user logs out, their token is added to the blackListToken collection to prevent further use.

// Without this, JWT tokens would remain valid until their expiration, even if the user logged out.

const blackListTokenSchema = new mongoose.Schema({
    token : {
        type : String, 
        required : true,
        unique : true
    }, 
    createdAt : {
        type : Date,
        default : Date.now,
        expiresIn : 86400
    }
});

const blackListTokenModel = mongoose.model('blackListToken', blackListTokenSchema);

export default blackListTokenModel;