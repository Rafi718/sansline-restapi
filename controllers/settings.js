require('dotenv').config()
global.NAME = process.env.NAME;
global.author = process.env.AUTHOR;
global.limit_free = process.env.LIMIT_FREE;
global.limit_premium = process.env.LIMIT_PREM;
global.mongo_Db = process.env.MONGO_DB;
global.recaptcha_key_1 = process.env.RECAPTH_KEY1;
global.recaptcha_key_2 = process.env.RECAPTH_KEY2;
global.my_email = process.env.EMAIL;
global.my_email_password = process.env.PASSWORD;
global.activation_token = process.env.ACTIVATION_TOKEN;
global.prem_token = process.env.PREMTOKEN;
global.port = process.env.PORT || 8000;