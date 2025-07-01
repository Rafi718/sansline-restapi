const fetch = require("node-fetch");

async function tinyurl(data) {
  try {
    let response = await fetch('https://carbonara.solopov.dev/api/cook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: data,
        backgroundColor: '#0062d1',
      }),
    });

    let imageBuffer = await response.buffer();
    return imageBuffer;
  } catch (error) {
    console.error(error);
  }
}

module.exports = tinyurl
