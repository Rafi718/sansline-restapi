const axios = require('axios');

async function gempa() {
  try {
    const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
    const result = response.data
    return result;
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw error;
  }
}

module.exports = gempa;