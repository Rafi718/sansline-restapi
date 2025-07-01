const axios = require("axios");

const kompastv = async (query) => {
  const options = {
    method: "GET",
    url: "https://newsapi.org/v2/top-headlines?country=id&apiKey=6b7b1ba8583a4626be48fce43157439f",
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

module.exports = kompastv;
