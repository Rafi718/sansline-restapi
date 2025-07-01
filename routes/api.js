const express = require("express");
const router = express.Router();
const fs = require("fs");
const youtubedl = require("youtube-dl-exec");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();
const {
  isLimit,
  limitMin,
  checkKey,
  checkPremium,
} = require("../database/function");
const scrape = require("../module/index.js");
const { fetchJson, getBuffer } = require("../lib/function");
const creator = "sansline";
require("../controllers/message");
require("dotenv").config();
//======================================================================
const instagram = require("../module/src/downloader/instagram.js");
const tiktok = require("../module/src/downloader/tiktok.js");
const aigpt = require("../module/src/ai/aigpt.js");
const gemini = require("../module/src/ai/gemini.js");
const ytsearch = require("../module/src/search/ytsearch.js");
const playstore = require("../module/src/search/playstore2.js");
const kompastv = require("../module/src/news/kompastv.js");
const jakpostnews = require("../module/src/news/jakpostnews.js");
const cnnindonesia = require("../module/src/news/cnnindonesia.js");
const cnbc = require("../module/src/news/cnbc.js");
const doa = require("../module/src/islami/doa.js");
const alquran = require("../module/src/islami/alquranjuz.js");
const jadwalsholat = require("../module/src/islami/jadwalsholat.js");
const doarandom = require("../module/src/islami/doarandom.js");
const pddikti = require("../module/src/search/pddikti.js");
const blackbockai = require("../module/src/ai/blackbockai.js");
const otakudesu = require("../module/src/anime/otakudesusearch.js");
const otakudesudetail = require("../module/src/anime/otakudesudetails.js");
const simiai = require("../module/src/ai/simi.js");
const diffusion = require("../module/src/ai/diffusion.js");
const { pinterest } = require("../module/src/search.js");
const texttospeech = require("../module/src/ai/texttospeech.js");
const ragbotai = require("../module/src/ai/ragbotai.js");
const marioai = require("../module/src/ai/marioai.js");
const Komikcast = require("../module/src/anime/Komikcast.js");
const tiktokseacrh = require("../module/src/search/tiktokseacrh.js");
const lirik = require("../module/src/search/lirik.js");
const google = require("../module/src/search/google.js");
const kodepos = require("../module/src/search/kodepos.js");
const gdrive = require("../module/src/downloader/gdrive.js");
const mediafire = require("../module/src/downloader/mediafire.js");
const wallpaper = require("../module/src/search/wallpaper.js");
const wikimedia = require("../module/src/search/wikimedia.js");
const spotifySearch2 = require("../module/src/search/spotifysearch.js");
const { spotifySearch, facebook2, downloader4twitter } = require("../module/src/downloader/download.js");
const {
  mangatoons,
  mangatoonpopuler,
} = require("../module/src/others/aubertify.js");
const komikcast2 = require("../module/src/anime/komikcast2.js");
const webtoon = require("../module/src/anime/webtoon.js");
const listbank = require("../module/src/databasemenu/listbank.js");
const cekbank = require("../module/src/databasemenu/cekbank.js");
const listewallet = require("../module/src/databasemenu/listewallet.js");
const cekewallet = require("../module/src/databasemenu/cekewallet.js");
const republika = require("../module/src/news/republika.js");
const sticker = require("../module/src/search/sticker.js");
const photoleap = require("../module/src/ai/photoleapai.js");
const hadist = require("../module/src/islami/hadist.js");
const pddikti2 = require("../module/src/search/pddikti2.js");
const gempaterbaru = require("../module/src/information/gempaterbaru.js");
const listgempa = require("../module/src/information/listgempa.js");
const discover = require("../module/src/search/discover.js");
const tiktok2 = require("../module/src/downloader/tiktok2.js");
const { facebook } = require("../module/src/downloader.js");
const twitter2 = require("../module/src/downloader/facebook.js");

//========================================================================
const domain = `sanslinedev.tech`;
//========================================================================
const msg = {
  paramquery: { status: "Gagal", message: `Parameter query q diperlukan` },
  paramprompt: { status: "Gagal", message: "Parameter prompt diperlukan" },
  paramkey: { status: "Gagal", message: "Parameter apikey diperlukan" },
  falapikey: {
    status: "Gagal",
    message: "Apikey tidak valid, apikey cek di halaman rofile",
  },
  premium: {
    status: "Gagal",
    message: `Apikey kamu tidak terdaftar sebagai user premium, daftar pemium https://${domain}/buypremium`,
  },
  nodata: { status: "Gagal", message: "Tidak ada data ditemukan" },
  error: {
    status: "Gagal",
    message:
      "Terjadi kesalahan pada server, Silakan laporkan masalah ini ke admin.",
  },
};

router.get("/ai/sansai", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `Limit apikey mu sudah habis, buy api premium unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await aigpt(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /gpt endpoint:", error);
    res.json(msg.error);
  }
});
//==================================================================

router.get("/ai/blackbockai", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await blackbockai(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /gpt endpoint:", error);
    res.json(msg.error);
  }
});

//========================================================================

router.get("/ai/gemini", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await gemini(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /gpt endpoint:", error);
    res.json(msg.error);
  }
});

//========================================================================

router.get("/ai/simi", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await simiai(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/ai/diffusion", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await diffusion(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /diffusion endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================
router.get("/ai/photoleap", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await photoleap(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /diffusion endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================
router.get("/ai/texttospeech", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    // const isPremium = await checkPremium(apikey);
    // if (!isPremium) return res.json(msg.premium);
    const result = await texttospeech(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /diffusion endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================
router.get("/ai/ragbotai", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await ragbotai(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /diffusion endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================
router.get("/ai/marioai", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);
    const result = await marioai(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /diffusion endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================

router.get("/search/youtube", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    // const isPremium = await checkPremium(apikey);
    // if (!isPremium) return res.json(msg.premium);
    const result = await ytsearch(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================

router.get("/search/discover", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    // const isPremium = await checkPremium(apikey);
    // if (!isPremium) return res.json(msg.premium);
    const result = await discover(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    // console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================
router.get("/search/playstore", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    // const isPremium = await checkPremium(apikey);
    // if (!isPremium) return res.json(msg.premium);
    const result = await playstore(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================
router.get("/information/pddikti", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: "Api Key Anda sudah habis.",
      });
    }

    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);

    const result = await pddikti(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    // Jika berhasil, kembalikan data dengan status sukses
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Kurangi limit penggunaan api key
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /pddikti endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/search/pddikti2", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: "Api Key Anda sudah habis.",
      });
    }

    const isPremium = await checkPremium(apikey);
    if (!isPremium) return res.json(msg.premium);

    const result = await pddikti2(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    // Jika berhasil, kembalikan data dengan status sukses
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Kurangi limit penggunaan api key
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /pddikti endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================

//============================================================
router.get("/search/pintereset", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await pinterest(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/pintereset endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/search/tiktokseacrh", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await tiktokseacrh(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/pintereset endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/search/lirik", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await lirik(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/pintereset endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/search/sticker", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await sticker(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================

router.get("/search/google", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await google(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/google endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/search/kodepos", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await kodepos(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/google endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/search/wallpaper", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await wallpaper(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/google endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================

router.get("/search/wikimedia", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await wikimedia(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/wikimedia endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================

router.get("/search/spotifysearch", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await spotifySearch2(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/wikimedia endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================

router.get("/search/spotifysearch2", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);

    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await spotifySearch(query);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      creator: creator,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /search/wikimedia endpoint:", error);
    res.json(msg.error);
  }
});
//============================================================

router.get("/news/kompastv", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await kompastv(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
//============================================================

router.get("/news/jakpostnews", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await jakpostnews(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/news/cnnindonesia", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await cnnindonesia(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/news/cnbc", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await cnbc(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/news/republika", async (req, res, next) => {
  try {
    // const query = req.query.q;
    // if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await republika();
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /news endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================

//DATABASE MENU

//============================================================
router.get("/database/listbank", async (req, res, next) => {
  try {
    // const query = req.query.q;
    // if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await listbank();
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/database/listewallet", async (req, res, next) => {
  try {
    // const query = req.query.q;
    // if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await listewallet();
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/database/cekbank", async (req, res, next) => {
  try {
    const bankCode = req.query.bankCode;
    const accountNumber = req.query.accountNumber;
    const apikey = req.query.apikey;

    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({ status: "Gagal", message: "ApiKey Anda sudah habis." });
    }

    if (!bankCode || !accountNumber) {
      return res.json({
        status: "Gagal",
        message: "Bank code dan nomor rekening harus disertakan.",
      });
    }

    const result = await cekbank(bankCode, accountNumber);

    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /database/cekbank endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/database/cekewallet", async (req, res, next) => {
  try {
    const bankCode = req.query.bankCode;
    const accountNumber = req.query.accountNumber;
    const apikey = req.query.apikey;

    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({ status: "Gagal", message: "ApiKey Anda sudah habis." });
    }

    if (!bankCode || !accountNumber) {
      return res.json({
        status: "Gagal",
        message: "Bank code dan nomor rekening harus disertakan.",
      });
    }

    const result = await cekewallet(bankCode, accountNumber);

    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    limitMin(apikey);
  } catch (error) {
    console.error("Error in /database/cekewallet endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================

//ISLAMIC MENU

//============================================================
router.get("/islami/doa", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const limit = await isLimit(apikey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await doa(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/islami/alquran", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await alquran(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/islami/jadwalsholat", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await jadwalsholat(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
router.get("/islami/doarandom", async (req, res, next) => {
  try {
    // const query = req.query.q;
    // if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await doarandom();
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================
//============================================================
router.get("/islami/hadist", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const result = await hadist(query);
    if (!result) {
      return res.json(msg.nodata);
    }
    res.json({
      status: "Success",
      code: 200,
      result: result,
    });
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /simi endpoint:", error);
    res.json(msg.error);
  }
});

//============================================================

router.get("/downloader/instagram", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const url = req.query.q;
    if (!url)
      return res.json({ status: "Gagal", message: "Parameter URL tidak ada" });
    if (!apikey)
      return res.json({
        status: "Gagal",
        message: "Parameter API key tidak ada",
      });

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey); // Fungsi untuk memeriksa limit API key
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Memanggil fungsi untuk mengunduh data dari Instagram
    const result = await instagram(url);
    if (!result) {
      return res.json({
        status: "Gagal",
        message: "Tidak ada data yang ditemukan",
      });
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    limitMin(apikey); // Fungsi untuk mengurangi limit penggunaan API key
  } catch (error) {
    console.error("Error in /downloader/instagram endpoint:", error);
    res.json({ status: "Gagal", message: "Terjadi kesalahan di server" });
  }
});

router.get("/downloader/gdrive", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const url = req.query.url;
    if (!url)
      return res.json({ status: "Gagal", message: "Parameter URL tidak ada" });
    if (!apikey)
      return res.json({
        status: "Gagal",
        message: "Parameter API key tidak ada",
      });

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey); // Fungsi untuk memeriksa limit API key
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Memanggil fungsi untuk mengunduh data dari Instagram
    const result = await gdrive(url);
    if (!result) {
      return res.json({
        status: "Gagal",
        message: "Tidak ada data yang ditemukan",
      });
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    limitMin(apikey); // Fungsi untuk mengurangi limit penggunaan API key
  } catch (error) {
    console.error("Error in /downloader/instagram endpoint:", error);
    res.json({ status: "Gagal", message: "Terjadi kesalahan di server" });
  }
});

router.get("/downloader/mediafire", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const url = req.query.url;
    if (!url)
      return res.json({ status: "Gagal", message: "Parameter URL tidak ada" });
    if (!apikey)
      return res.json({
        status: "Gagal",
        message: "Parameter API key tidak ada",
      });

    const check = await checkKey(apikey); // Fungsi untuk memeriksa validitas API key
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey); // Fungsi untuk memeriksa limit API key
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Memanggil fungsi untuk mengunduh data dari Instagram
    const result = await mediafire(url);
    if (!result) {
      return res.json({
        status: "Gagal",
        message: "Tidak ada data yang ditemukan",
      });
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    limitMin(apikey); // Fungsi untuk mengurangi limit penggunaan API key
  } catch (error) {
    console.error("Error in /downloader/instagram endpoint:", error);
    res.json({ status: "Gagal", message: "Terjadi kesalahan di server" });
  }
});

router.get("/downloader/video", async (req, res) => {
  const url = req.query.q;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  // Try streaming using yt-dlp as a Python module'
  const ytDlpCommandStream = await youtubedl(url, {
    g: true,
  });

  // If streaming is successful, check if the URL can be accessed
  const videoUrl = ytDlpCommandStream.trim();
  fetch(videoUrl)
    .then((response) => {
      if (response.ok) {
        res.setHeader("Content-Type", "video/mp4");
        response.body.pipe(res);
      } else {
        // console.log(
        //   "Streaming URL not accessible, falling back to download method"
        // );
        fallbackDownloadMethod(url, res);
      }
    })
    .catch((fetchError) => {
      console.error("Error while fetching the video:", fetchError);
      fallbackDownloadMethod(url, res);
    });
});

function fallbackDownloadMethod(url, res) {
  // If streaming fails, fallback to downloading using yt-dlp as a Python module
  const ytDlpProcess = youtubedl.exec(url, {
    o: "-",
  });

  res.setHeader("Content-Type", "video/mp4");

  ytDlpProcess.stdout.on("data", (chunk) => {
    res.write(chunk);
  });

  ytDlpProcess.stdout.on("end", () => {
    res.end();
  });

  // ytDlpProcess.stderr.on("data", (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  ytDlpProcess.on("error", (error) => {
    console.error("Failed to start yt-dlp process:", error);
    res.status(500).send("Failed to download video");
  });
}

router.get("/downloader/tiktok", async (req, res, next) => {
  try {
    const querybuilder = new URLSearchParams(req.query);
    const apikey = req.query.apikey;
    const videoUrl = req.query.q;

    if (!videoUrl) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Melakukan scraping data TikTok
    const result = await tiktok(videoUrl, [
      req.protocol + "://" + req.headers.host,
      querybuilder.toString(),
    ]);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok endpoint:", error);
    res.json(msg.error);
  }
});

router.get("/downloader/tiktok2", async (req, res, next) => {
  try {
    const querybuilder = new URLSearchParams(req.query);
    const apikey = req.query.apikey;
    const url = req.query.url;

    if (!url) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Melakukan scraping data TikTok
    const result = await tiktok2(url);


    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok2 endpoint:", error);
    res.json(msg.error);
  }
});

//===========================================================
router.get("/downloader/twitter", async (req, res, next) => {
  try {
    const querybuilder = new URLSearchParams(req.query);
    const apikey = req.query.apikey;
    const videoUrl = req.query.q;

    if (!videoUrl) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Melakukan scraping data TikTok
    const result = await twitter2(videoUrl);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok endpoint:", error);
    res.json(msg.error);
  }
});

//======================================================================
router.get("/downloader/facebook", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const url = req.query.url;

    if (!url) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Melakukan scraping data TikTok
    const result = await facebook2(url);
    
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok endpoint:", error);
    res.json(msg.error);
  }
});

//======================================================================

router.get("/ai/gemini", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await gemini(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/gemini endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================

router.get("/anime/otakudesusearch", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await otakudesu(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/gemini endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================
router.get("/anime/otakudesudetail", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await otakudesudetail(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/gemini endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================
router.get("/anime/Komikcast", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await Komikcast(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/gemini endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================
router.get("/anime/Komikcast2", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await komikcast2(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/gemini endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================
router.get("/anime/mangatoon", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await mangatoons(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/mangatoon endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================
router.get("/anime/mangatoonpopuler", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await mangatoonpopuler(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/mangatoon endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================
router.get("/anime/webtoon", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const prompt = req.query.q;

    if (!prompt) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Menghasilkan teks menggunakan model generatif Gemini
    const result = await webtoon(prompt);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /ai/mangatoon endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================

router.get("/downloader/youtubemp4", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const videoUrl = req.query.url;

    if (!videoUrl) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Melakukan scraping data TikTok
    const result = await scrape.downloader.youtube(videoUrl);
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok endpoint:", error);
    res.json(msg.error);
  }
});
//======================================================================

//MENU INFORMATION

//======================================================================

router.get("/information/gempaterbaru", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    // const query = req.query.q;

    // if (!query) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    // Melakukan scraping data TikTok
    const result = await gempaterbaru();
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok endpoint:", error);
    res.json(msg.error);
  }
});

//======================================================================

router.get("/information/listgempa", async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    // const query = req.query.q;

    // if (!query) return res.json(msg.paramquery);
    if (!apikey) return res.json(msg.paramkey);

    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);

    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const result = await listgempa();
    if (!result) {
      return res.json(msg.nodata);
    }

    res.json({
      status: "Success",
      code: 200,
      result: result,
    });

    // Mengurangi batasan penggunaan API key setelah sukses
    await limitMin(apikey);
  } catch (error) {
    console.error("Error in /downloader/tiktok endpoint:", error);
    res.json(msg.error);
  }
});

//================================================================

//================================================================
router.get("/seaart", async (req, res, next) => {
  try {
    const query = req.query.prompt;
    if (!query) return res.json(msg.paramprompt);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const isApikey = await checkKey(apikey);
    if (!isApikey) return res.json(msg.falapikey);
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }
    const image = await scrape.ai.seaart(query);
    if (!image || typeof image !== "string") {
      throw new Error("Invalid image URL");
    }
    res.setHeader("Content-Type", "image/png");
    const imageBuffer = await fetch(image).then((res) => res.buffer());
    res.send(imageBuffer);
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /seaart endpoint:", error);
    res.json(msg.error);
  }
});

router.get("/voicevox", async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(msg.paramquery);
    const apikey = req.query.apikey;
    if (!apikey) return res.json(msg.paramkey);
    const check = await checkKey(apikey);
    if (!check)
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    const limit = await isLimit(apikey);
    if (limit) {
      return res.json({
        status: "Gagal",
        message: `ApiKey Mu sudah habis, buy api premium untuk unlimited request https://${domain}/buypremium `,
      });
    }

    const apirandom = ["x739h-785175886"];
    const apikeynya = apirandom[Math.floor(Math.random() * apirandom.length)];
    const result = await fetch(
      `https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=${apikeynya}&speaker=17&pitch=0&intonationScale=1&speed=1&text=${query}`
    ).then((res) => res.buffer());
    await fs.writeFileSync(__path + "/tmp/voice.mp3", result);
    res.set("Content-Type", "audio/mpeg");
    res.sendFile(__path + "/tmp/voice.mp3");
    limitMin(apikey);
  } catch (error) {
    console.error("Error in /voicevox endpoint:", error);
    res.json(msg.error);
  }
});

module.exports = router;
