require('../controllers/settings');
require('../controllers/message');

const express = require('express');
const router = express.Router();
const fs = require('fs');
const ms = require('ms');
const flash = require('connect-flash');
const os = require('os');
const path = require('path');
// Lib
const { isAuthenticated } = require('../lib/auth');
const { connectToMongoDb } = require('../database/connect');
const {
  getApikey,
  checkKey,
  checkLimit,
  getTotalUsers,
  checkUsername2,
  checkPremium,
  checkPremiumTime,
} = require('../database/function');

const {
  User
} = require('../database/schema');

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
};

router.get('/', (req, res) => {
  res.render('home', {
    layout: 'home'
  });
})

router.get('/apa-itu-restapi', (req, res) => {
  res.render('apaiturestapi', {
    layout: 'apaiturestapi'
  });
})

router.get('/apa-itu-endpoint', (req, res) => {
  res.render('apaituendpoint', {
    layout: 'apaituendpoint'
  });
})

router.get('/cara-kerja-rest-api', (req, res) => {
  res.render('carakerjarestapi', {
    layout: 'carakerjarestapi'
  });
})

router.get('/example-code', (req, res) => {
  res.render('example', {
    layout: 'example'
  });
})

router.get('/get-started', (req, res) => {
  res.render('get-started', {
    layout: 'get-started'
  });
})

router.get('/dashboard', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey, username, limit, requestToday } = getkey
  res.render('index', {
    apikey,
    username,
    limit,
    requestToday,
    layout: 'index'
  });
})

router.get('/profile', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey, username, limit, email, requestToday, premium, premiumTime } = getkey
  const formattedPremiumTime = premiumTime ? formatDate(premiumTime) : null;
  res.render('profile', {
    apikey,
    username,
    limit,
    email,
    requestToday,
    premium,
    premiumTime: formattedPremiumTime,
    layout: 'profile'
  });
})

router.get('/buypremium', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('buypremium', {
    apikey,
    layout: 'buypremium'
  });
})

router.get('/settings', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('settings', {
    apikey,
    layout: 'settings'
  });
})

router.get('/aimenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('aimenu', {
    apikey,
    layout: 'aimenu'
  });
})

router.get('/animemenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('animemenu', {
    apikey,
    layout: 'animemenu'
  });
})

router.get('/islammenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('islammenu', {
    apikey,
    layout: 'islammenu'
  });
})

router.get('/news', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('newsmenu', {
    apikey,
    layout: 'newsmenu'
  });
})

router.get('/database', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('databasemenu', {
    apikey,
    layout: 'databasemenu'
  });
})

router.get('/downloadermenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('downloadermenu', {
    apikey,
    layout: 'downloadermenu'
  });
})
router.get('/informationmenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('informationmenu', {
    apikey,
    layout: 'informationmenu'
  });
})

router.get('/othersmenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('othersmenu', {
    apikey,
    layout: 'othersmenu'
  });
})

router.get('/searchmenu', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  res.render('searchmenu', {
    apikey,
    layout: 'searchmenu'
  });
})

router.get('/changelog', async (req, res) => {
  res.render('changelog', {
    layout: 'changelog'
  });
})

router.get('/report-bug', isAuthenticated, (req, res) => {
  res.render('report-bug', {
    layout: 'report-bug'
  });
})

// Api Sistem
router.get('/checkapikey', async (req, res, next) => {
  try {
    const apikey = req.query.apikey;

    if (!apikey) {
      return res.json(msg.paramkey);
    }

    const check = await checkKey(apikey);

    if (!check) {
      return res.json({ status: "Error", code: 404, message: "Error not Found." });
    }

    const limit = await checkLimit(apikey);

    if (!limit) {
      return res.json({ status: "Error", code: 404, message: "Error not Found." });
    }

    const username = await checkUsername2(apikey);

    if (!username) {
      return res.json({ status: "Error", code: 404, message: "Error not Found." });
    }

    const premium = await checkPremium(apikey);

    let responseMessage = "No";
    if (premium) {
      responseMessage = "Yes";
    }

    const premiumExpired = await checkPremiumTime(apikey);

    let response = {
      status: "Success",
      result: {
        username: username,
        limit: limit,
        premium: responseMessage,
        premiumExpired: null,
      },
    };

    if (premiumExpired !== null) {
      const PremiumTime2 = formatDate(premiumExpired);
      response.result.premiumExpired = PremiumTime2;
    } else {
      response.result.premiumExpired = "You are not user premium.";
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ status: "Error", code: 500, message: "Internal Server Error." });
  }
});

router.get('/visitor', (req, res) => {
  fs.readFile('Visit.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read Visit.txt' });
    }

    const currentVisitorCount = parseInt(data, 10) || 0;
    const newVisitorCount = currentVisitorCount + 1;

    fs.writeFile('Visit.txt', newVisitorCount.toString(), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update Visit.txt' });
      }

      return res.json({ SanslineApi: newVisitorCount });
    });
  });
});


let apiRequestsData = {};

fs.readFile('total-requests.json', 'utf8', (err, data) => {
  if (!err) {
    try {
      apiRequestsData = JSON.parse(data) || {};
    } catch (parseError) {
      console.error('Failed to parse total-requests.json:', parseError);
    }
  }
});

router.use((req, res, next) => {
  const urlPattern = /^\/api(?:\/|$)/;

  if (urlPattern.test(req.url)) {
    const today = new Date().toISOString().split('T')[0];

    apiRequestsData[today] = apiRequestsData[today] || 0;

    apiRequestsData[today]++;

    try {
      fs.writeFileSync('total-requests.json', JSON.stringify(apiRequestsData));
    } catch (writeError) {
      console.error('Failed to save API requests:', writeError);
    }
  }

  next();
});

router.get('/api-requests', (req, res) => {
  const sortedApiRequestsData = sortObjectByDate(apiRequestsData);
  const totalAllRequests = Object.values(apiRequestsData).reduce((acc, total) => acc + total, 0);
  res.json({ todayRequests: sortedApiRequestsData[0]?.total || 0, totalAllRequests, apiRequestsData: sortedApiRequestsData });
});

function sortObjectByDate(obj) {
  return Object.entries(obj)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .map(([date, total]) => ({ date, total }));
}

let startTime = new Date();

router.get('/runtime', (req, res) => {
  const currentTime = new Date();
  const runtimeInMilliseconds = currentTime - startTime;

  const runtime = formatRuntime(runtimeInMilliseconds);

  res.json({ runtime });
});

function formatRuntime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const formattedTime = [];

  if (years > 0) {
    formattedTime.push(`${years} tahun`);
    formattedTime.push(`${months % 12} bulan`);
  } else if (months > 0) {
    formattedTime.push(`${months} bulan`);
    formattedTime.push(`${days % 30} hari`);
  } else if (days > 0) {
    formattedTime.push(`${days} hari`);
    formattedTime.push(`${hours % 24} jam`);
  } else if (hours > 0) {
    formattedTime.push(`${hours} jam`);
    formattedTime.push(`${minutes % 60} menit`);
  } else if (minutes > 0) {
    formattedTime.push(`${minutes} menit`);
    formattedTime.push(`${seconds % 60} detik`);
  } else {
    formattedTime.push(`${seconds} detik`);
  }

  return formattedTime.join(', ');
}

const cpuInfo = os.cpus().map(cpu => {
  cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
  return {
    "Model CPU": cpu.model.trim(),
    "Kecepatan CPU": `${(cpu.speed / 1000).toFixed(2)} GHz`,
    "Penggunaan CPU": {
      "User": `${(cpu.times.user / 1e6).toFixed(2)} s`,
      "Nice": `${(cpu.times.nice / 1e6).toFixed(2)} s`,
      "Sistem": `${(cpu.times.sys / 1e6).toFixed(2)} s`,
      "Idle": `${(cpu.times.idle / 1e6).toFixed(2)} s`,
      "Interrupt": `${(cpu.times.irq / 1e6).toFixed(2)} s`
    },
    "Total Penggunaan CPU": `${(cpu.total / 1e6).toFixed(2)} s`
  };
});

function formatPersentase(persentase) {
  return persentase.toFixed(2);
}

router.get('/info-server', (req, res) => {
  const totalRAM = os.totalmem();
  const freeRAM = os.freemem();
  const usedRAM = totalRAM - freeRAM;
  const persentasePenggunaanRAM = (usedRAM / totalRAM) * 100;

  res.json({
    infoCPU: cpuInfo,
    infoRAM: {
      digunakan: formatBytes(usedRAM),
      total: formatBytes(totalRAM),
      persentasePenggunaan: formatPersentase(persentasePenggunaanRAM),
    },
  });
});

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

router.get('/getTotalUsers', async (req, res) => {
  try {
    const totalUsers = await getTotalUsers();
    res.json({ totalUsers });
  } catch (error) {
    console.error('Gagal mengambil total pengguna:', error.message);
    res.status(500).json({ error: 'Gagal mengambil total pengguna' });
  }
});

const changelogFilePath = './changelog.json';

router.get('/api-changelog', (req, res) => {
  try {
    const changelogData = fs.readFileSync(changelogFilePath, 'utf8');
    const changelog = JSON.parse(changelogData);

    res.json(changelog);
  } catch (error) {
    console.error('Error reading changelog file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/changeapikey', async (req, res) => {
  const { email, newkey } = req.body;

  try {
      const user = await User.findOne({ email: email });

      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
      }

      if (user.premium) {
          const result = await User.updateOne({ email: email }, { apikey: newkey });

          if (result.nModified === 1) {
              return res.json({ success: true, message: 'Api key successfully changed for premium user.', newkey: newkey });
          } else {
              return res.json({ success: false, message: 'No modification made.' });
          }
      } else {
          return res.json({ success: false, message: 'You are not a premium user.' });
      }
  } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router