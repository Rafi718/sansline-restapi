const axios = require("axios");

const cnbc = async (kota) => {
  const options = {
    method: "GET",
    url: `http://api.aladhan.com/v1/calendarByCity/2017/4?city=Indonesia&country=${kota}&method=2`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // console.log("API Response:", data); // Log respons API untuk memeriksa struktur data

    const result = data.data;

    return result;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return null;
  }
};

module.exports = cnbc;
