const axios = require("axios");

const gempaterbaru = async (query) => {
  const options = {
    method: "GET",
    url: `https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // console.log("API Response:", data); // Log respons API untuk memeriksa struktur data

    const result = data.Infogempa;

    return result;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return null;
  }
};

module.exports = gempaterbaru;
