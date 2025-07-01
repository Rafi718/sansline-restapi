const axios = require("axios");

const photoleap = async (query) => {
  // Encode query to handle spaces and special characters
  const encodedQuery = encodeURIComponent(query);
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/photoleap?message=${encodedQuery}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // console.log(data);

    let result = {
      message: data.data,
    };

    return result;
  } catch (error) {
    console.error("Error fetching data from BlackboxAI:", error);
    return null;
  }
};

module.exports = photoleap;
