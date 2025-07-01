const axios = require("axios");

const jakpostnews = async (query) => {
  const options = {
    method: "GET",
    url: "https://jakpost.vercel.app/api/podcast/page/",
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

module.exports = jakpostnews;
