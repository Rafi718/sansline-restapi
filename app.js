console.log("Program Start...");
require('./controllers/settings');
require('dotenv').config()

const server = require('./server');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
const flash = require('connect-flash');
const rateLimit = require("express-rate-limit");
const passport = require('passport');
const expressLayout = require('express-ejs-layouts');
const compression = require('compression');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const memoryStore = require('memorystore')(session);
const schedule = require('node-schedule');
const cron = require('node-cron');
cors = require('cors');
secure = require('ssl-express-www');
const fs = require('fs');
const { ExpiredTime } = require('./database/premium')
const { runRecordEndpointsInChangelog } = require('./routes/generateChangelog.js');

// Database
const { connectToMongoDb } = require('./database/connect');
const { resetLimit } = require('./database/function');
connectToMongoDb();

// Reset limit every 00:00 WIB
cron.schedule(
  "40 9 * * *",
  () => {
    resetLimit();
    console.log('⌬ Reset Limit User Free');
  },
  {
    schedule: true,
    timezone: "Asia/Jakarta",
  }
);

cron.schedule('* * * * *', () => {
  ExpiredTime();
});

cron.schedule('* * * * *', () => {
  runRecordEndpointsInChangelog();
});

const mainrouter = require('./routes/index')
apirouter = require('./routes/api')
authrouter = require('./routes/auth')
apipremrouter = require('./routes/premium')

app.set('trust proxy', 1);
app.use(compression());

const limit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2000,
  message: 'Oops too many requests'
});
app.use(limit);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));
app.use(expressLayout);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname, 'assets', 'img', 'favicon', 'favicon.ico')))
app.enable('trust proxy');
app.set("json spaces", 2)
app.use(cors())
app.use(secure)

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new memoryStore({
    checkPeriod: 86400000
  }),
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use('/', mainrouter)
app.use('/', authrouter)
app.use('/api', apirouter)
app.use('/premium', apipremrouter)

app.use(function (req, res, next) {
  res.render('error', {
    layout: 'error'
  });
})

app.listen(server, () => {
  console.log(server.text + server.port + server.text2)
})

module.exports = app
