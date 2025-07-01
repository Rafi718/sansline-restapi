const { OpenAI } = require("openai");

async function aigpt(query) {
  const openai = new OpenAI({
    apiKey: "1660ab1df2fe47f3895e01caf84b03a9",
    baseURL: "https://api.aimlapi.com", // Sesuaikan dengan endpoint yang benar
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content: "Kamu merupakan ai yang bisa apapun",
        },
        { role: "user", content: query }, // Menggunakan parameter query
      ],
      temperature: 0.5,
      max_tokens: 50,
    });
    const result = chatCompletion.choices;
    console.log("result:\n", chatCompletion.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Error during API call:", error);
  }
}

module.exports = aigpt;
