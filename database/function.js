require('../controllers/settings');
const {
   User
} = require('./schema');

async function addUser(username, email, password, apikey) {
   let obj = {
      username,
      email,
      password,
      apikey,
      defaultKey: apikey,
      premium: false,
      premiumTime: null,
      isAdmin: false,
      limit: limit_free
   };
   User.create(obj);
}
module.exports.addUser = addUser
 
async function getTotalUsers() {
   try {
     const totalUsers = await User.countDocuments({});
     return totalUsers;
   } catch (error) {
     throw new Error('Gagal mengambil total pengguna');
   }
 }
 
 module.exports.getTotalUsers = getTotalUsers;

 async function checkPremium(apikey) {
   try {
       const user = await User.findOne({ apikey: apikey });
       return user ? user.premium : false;
   } catch (error) {
       console.error('Error checking premium status:', error);
       return false;
   }
}
module.exports.checkPremium = checkPremium;

async function checkPremiumTime(apikey) {
   try {
       const user = await User.findOne({ apikey: apikey });
       return user ? user.premiumTime : null;
   } catch (error) {
       console.error('Error checking premium time:', error);
       return null;
   }
}
module.exports.checkPremiumTime = checkPremiumTime;

async function checkUsername(username) {
    let users = await User.findOne({
       username: username
    });
    if (users !== null) {
       return users.username;
    } else {
       return false;
    }
 }
 module.exports.checkUsername = checkUsername;

async function checkUsername2(apikey) {
    let key = await User.findOne({apikey: apikey});
    return key.username;
}
module.exports.checkUsername2 = checkUsername2;

async function checkEmail(email){
   let x = await User.findOne({
      email: email
   });
   if (x !== null) {
      return x.email;
   } else {
      return false;
   }
}

module.exports.checkEmail = checkEmail;

async function checkKey(apikey) {
   let db = await User.findOne({
      apikey: apikey
   });
   if (db === null) {
      return false;
   } else {
      return db.apikey;
   }
}
module.exports.checkKey = checkKey;

async function resetLimit() {
   let users = await User.find({});
   users.forEach(async (data) => {
       let { username, apikey, premium } = data;
       if (premium === true) {
           return;
       }
       await User.updateOne({ username: username }, { limit: limit_free }, function (err, res) {
           if (err) throw err;
       });
   });
}

module.exports.resetLimit = resetLimit;

async function isLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        if (key.limit <= 0){
            return true;
        } else {
            return false;
        }
    }
module.exports.isLimit = isLimit;

async function checkLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        return key.limit;
    }
module.exports.checkLimit = checkLimit;

async function changeKey(email, key) {
    try {
        const result = await User.updateOne({ email: email }, { apikey: key });

        if (result.nModified === 1) {
            return { success: true, message: 'Kunci berhasil diubah.' };
        } else {
            return { success: false, message: 'Pengguna tidak ditemukan atau tidak ada modifikasi yang dilakukan.' };
        }
    } catch (err) {
        throw err;
    }
}

module.exports.changeKey = changeKey;

async function limitMin(apikey) {
    let key = await User.findOne({
      apikey: apikey
    });
   let { premium } = key
   let mun = key.limit + 1
    let min = key.limit - 1;
           if (premium === null) {
         return User.updateOne({apikey: apikey}, {limit: mun}, function (err, res) {
         if (err) throw err;
                 })   
             } else {
         return User.updateOne({apikey: apikey}, {limit: min}, function (err, res) {
         if (err) throw err;
                 })
             }
         }
 module.exports.limitMin = limitMin

async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username, limit:users.limit, email:users.email, requestToday:users.requestToday, premium:users.premium, premiumTime:users.premiumTime};
    }
module.exports.getApikey = getApikey;