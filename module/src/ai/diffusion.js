const axios = require("axios");

const diffusion = async (query) => {
  // Encode query to handle spaces and special characters
  const encodedQuery = encodeURIComponent(query);
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/diffusion?message=${encodedQuery}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Ambil hanya respon data dari respons API
    let result = {
      url: data.data,
    }

    return result;
  } catch (error) {
    console.error("Error fetching data from BlackboxAI:", error);
    return null;
  }
};

module.exports = diffusion;
