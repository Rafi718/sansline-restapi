const axios = require("axios");

const gemini = async (query) => {
  // Encode query to handle spaces and special characters
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/instagram?url=${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Ambil hanya respon data dari respons API
    let result = {
      Thumb: data.data[0].thumb,
      Link: data.data[0].link,
    }

    return result;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

module.exports = gemini;
