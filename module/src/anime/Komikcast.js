const axios = require("axios");

const komikcast = async (query) => {
  // Encode query to handle spaces and special characters
  const options = {
    method: "GET",
    url: `https://api.agatz.xyz/api/komikcast?message=${query}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log(data.data);

    let result = {
      Info: data.data,


    };

    return result;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

module.exports = komikcast;
