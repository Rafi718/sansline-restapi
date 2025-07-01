const axios = require("axios");

const ytsearch = async (query) => {
  const options = {
    method: "GET",
    url: "https://google-play-api-detailed.p.rapidapi.com/search",
    params: {
      term: query,
      num: "20",
      price: "all",
      lang: "en",
      country: "us",
    },
    headers: {
      "x-rapidapi-key": "a48d7930f0msh9691ddaea15dc19p13b2f6jsncb4d212a795c",
      "x-rapidapi-host": "google-play-api-detailed.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log("API Response:", data); // Log respons API untuk memeriksa struktur data

    let result = data;

    return result;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return null;
  }
};

module.exports = ytsearch;
