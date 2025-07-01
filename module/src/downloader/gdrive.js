const axios = require("axios");

const gdrive = async (url) => {
  // Encode query to handle spaces and special characters
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/drivedl?url=${url}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Ambil hanya respon data dari respons API
    const result = data.data;

    return result;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

module.exports = gdrive;
