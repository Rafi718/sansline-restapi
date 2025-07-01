const axios = require("axios");

const google = async (query) => {
  // Encode query to handle spaces and special characters
  const encodedQuery = encodeURIComponent(query);
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/google?message=${encodedQuery}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log(data);

    let result = {
      message: data.data,
    };

    return result;
  } catch (error) {
    console.error("Error fetching data from BlackboxAI:", error);
    return null;
  }
};

module.exports = google;
