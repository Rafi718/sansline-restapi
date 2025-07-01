const axios = require("axios");

const listgempa = async (query) => {
  const options = {
    method: "GET",
    url: `https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json`,
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

module.exports = listgempa;
