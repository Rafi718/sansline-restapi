const axios = require("axios");

const texttospeech = async (query) => {
  // Encode query to handle spaces and special characters
  const encodedQuery = encodeURIComponent(query);
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/tts?message=${encodedQuery}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Ambil hanya respon data dari respons API
    let result = {
      text: data.data[0].shortText,
      url: data.data[0].url,
    }

    return result;
  } catch (error) {
    console.error("Error fetching data from BlackboxAI:", error);
    return null;
  }
};

module.exports = texttospeech;
