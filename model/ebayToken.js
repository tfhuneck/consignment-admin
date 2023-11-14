const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
    access_token: {type: String, default: null},
    expires_in: {type: Number,  default: 0},
    refresh_token: {type: String, default: null},
    refresh_token_expires_in: {type: Number,  default: 0}
})

const UserToken = mongoose.model('UserToken', UserTokenSchema);

UserToken.createCollection()
    .then((collection) => {
    console.log('UserToken collection created')   
    })

module.exports = UserToken
