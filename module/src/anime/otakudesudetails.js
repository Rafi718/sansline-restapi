const axios = require("axios");

const gemini = async (query) => {
  // Encode query to handle spaces and special characters
  const options = {
    method: "GET",
    url: ` https://otakudesu-anime-api.vercel.app/api/v1/detail/${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log(data);

    let result = {
      Info: data.anime_detail,
      episode: data.episode_list,

    };

    return result;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

module.exports = gemini;
