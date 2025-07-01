const fetch = require('node-fetch');

async function openai(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/gpt2", // Menggunakan model GPT-2 sebagai contoh
        {
            headers: { Authorization: "." },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    
    const result = await response.json();
    const generatedText = result.generated_text;
    
    return generatedText;
}

module.exports = openai