const fetch = require('node-fetch');

async function simi(text) {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${encodeURIComponent(text)}&lc=id&key=`, // Ganti 'YOUR_API_KEY_HERE' dengan kunci API Anda
      };
  
      const response = await fetch('https://api.simsimi.vn/v2/simtalk', options);
      const json = await response.json();
  
      return json.message;
    } catch (error) {
      throw error;
    }
  }

  module.exports = simi;