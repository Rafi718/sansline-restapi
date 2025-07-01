const axios = require("axios");

const cekewallet = async (bankCode, accountNumber) => {
  const options = {
    method: "GET",
    url: `https://api-rekening.lfourr.com/getEwalletAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // console.log("API Response:", data); // Uncomment to log API response to check data structure

    const result = data.data; // Adjust this according to the actual structure of the response data

    return result;
  } catch (error) {
    console.error("Error fetching bank account data:", error);
    return null;
  }
};

module.exports = cekewallet;
