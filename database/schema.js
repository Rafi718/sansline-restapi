const mongoose = require('mongoose');

const Users = mongoose.Schema({
    username: { type: String },
    password: { type: String},
    email: { type: String },
    apikey: { type: String },
    defaultKey: { type: String },
    isAdmin: { type: Boolean },
    premium: { type: Boolean },
    premiumTime: { type: Number },
    limit: { type: Number },
    requestToday: { type: Number }
}, { versionKey: false });
module.exports.User = mongoose.model('user', Users);