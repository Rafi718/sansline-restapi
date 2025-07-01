const axios = require("axios");

const youtube = async (query) => {
  // Encode query to handle spaces and special characters
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/ytmp4?url=${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // console.log(data.data);

    let result = {
      title: data.data.title,
      channel: data.data.uploader_id,
      channel_id: data.data.channel_id,
      duration: data.data.duration,
      view: data.data.view_count,
      thumbnail: data.data.thumbnail,
      channel: data.data.uploader_id,
      url_mp4: data.data.formatsVideoOnly[0].manifest_url ,
    }

    return result;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

module.exports = youtube;
