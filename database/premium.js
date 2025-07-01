require('dotenv').config()
const { User, Utils } = require('./schema');
const toMs = require('ms');
const { limitCount, limit_premium } = require('../controllers/settings');
const e = require('connect-flash');
const tokens = global.prem_token
module.exports.tokens = tokens

async function addPremium(username, customKey, days) {
    try {
        // 60000 = 1 menit untuk tes, 86400000 = 1 hari
        const expirationDate = new Date(Date.now() + days * 86400000);

        const updatedUser = await User.updateOne(
            { username: username },
            { apikey: customKey, premium: true, premiumTime: expirationDate, limit: global.limit_premium }
        );

        if (updatedUser.nModified === 1) {
            return { success: true, message: 'Premium status updated successfully.' };
        } else {
            return { success: false, message: 'The user was not found or no modifications were made.' };
        }
    } catch (err) {
        throw err;
    }
}

module.exports.addPremium = addPremium;

async function ExpiredTime() {
    try {
        let users = await User.find({});
        for (const data of users) {
            let { premiumTime, defaultKey, username } = data;
            if (!premiumTime || premiumTime === null) continue;

            if (Date.now() >= premiumTime) {
                await User.updateOne(
                    { username: username },
                    { apikey: defaultKey, premium: false, premiumTime: null, limit: global.limit_free }
                );
                console.log(`Premium period of ${username} has expired.`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

module.exports.ExpiredTime = ExpiredTime

async function deletePremium(username) {
    let users = await User.findOne({ username: username });
    let key = users.defaultKey
    User.updateOne({ username: username }, { apikey: key, premium: false, premiumTime: null, limit: global.limit_free }, function (err, res) {
        if (err) throw err;
    })
}
module.exports.deletePremium = deletePremium

async function checkPremium(username) {
    const user = await User.findOne({ username: username });
    return user && user.premium === true;
}

module.exports.checkPremium = checkPremium;