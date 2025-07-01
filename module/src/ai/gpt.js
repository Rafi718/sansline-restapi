const axios = require('axios');

async function gpt(query) {
  const options = {
    method: 'POST',
    url: 'https://gemini-pro-ai.p.rapidapi.com/',
    headers: {
      'x-rapidapi-key': 'a48d7930f0msh9691ddaea15dc19p13b2f6jsncb4d212a795c', // Ganti dengan kunci API RapidAPI Anda
      'x-rapidapi-host': 'gemini-pro-ai.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      contents: [
        {
          role: 'user',
          parts: [{ text: query }]
        }
      ]
    }
  };

  try {
    const response = await axios.request(options);
    const responseData = response.data;
    const result = responseData.candidates[0].content.parts[0].text.trim();
    console.log(resul);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Melempar kembali error untuk ditangani di luar
  }
}

module.exports = gpt;
