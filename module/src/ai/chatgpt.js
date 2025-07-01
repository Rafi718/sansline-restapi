const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function ChatGpt(query) {
  const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeURIComponent(query)}&hlgpt=id`, {
    method: "GET",
    headers: {
      "Referer": "https://gptgo.ai/?hl=id",
      "origin": "https://gptgo.ai/",
    }
  });  
  const tokenData = await tokenResponse.json();
  const gpttoken = tokenData.token;

  const response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${gpttoken}`, {
    method: "GET",
    headers: {
      "Referer": "https://gptgo.ai/?hl=id",
      "origin": "https://gptgo.ai/",
      "accept": "text/event-stream"
    }
  });

  const inputText = await response.text();
  const arrays = inputText.split('\n');
  const result = arrays.reduce((acc, item) => {
    const match = item.match(/"content":"([^"]+)"/);
    if (match) {
      const content = match[1];
      acc.push(content);
    }
    return acc;
  }, []);

  const mergedContent = { content: result.join('') };
  return mergedContent;
}

module.exports = ChatGpt;
