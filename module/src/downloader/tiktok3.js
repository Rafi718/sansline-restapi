const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function tiktok2(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://ttsave.app/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Referer": "https://ttsave.app/id"
        },
        body: new URLSearchParams(Object.entries({ url: url })),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const htmlText = await response.text();
      const $ = cheerio.load(htmlText);

      // Mengekstrak informasi dari hasil scraping menggunakan Cheerio
      const result = {
        url: url,
        title: $("body > div.w-full.h-full.sm:max-w-screen-sm.sm:mx-auto > div:nth-child(2) > div:nth-child(5) > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div:nth-child(1) > h2").text(),
        time: $("#time").text(),
        hd: $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href"),
        sd: $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a").attr("href"),
        audio: $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(3) > a").attr("href"),
      };

      resolve({ result });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = tiktok2;
