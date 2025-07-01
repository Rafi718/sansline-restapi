const axios = require("axios");

const gemini = async (query) => {
  // Encode query to handle spaces and special characters
  const options = {
    method: "GET",
    url: `https://otakudesu-anime-api.vercel.app/api/v1/search/${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log(data);

    let result = {
      Title: data.search[0].title,
      Thumb: data.search[0].thumb,
      Genres: data.search[0].genres,
      Status: data.search[0].status,
      Rating: data.search[0].rating,
      Url: data.search[0].endpoint,

    };

    return result;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

module.exports = gemini;
