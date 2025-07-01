const axios = require("axios");

const alquran = async (query) => {
  const options = {
    method: "GET",
    url: `https://api.npoint.io/99c279bb173a6e28359c/surat/${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // console.log("API Response:", data); // Log respons API untuk memeriksa struktur data

    const result = data;

    return result;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return null;
  }
};

module.exports = alquran;
