const fetch = require("node-fetch");

async function chatAI(chat, model) {
    const headers = {
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        "Content-Type": "application/json",
        "Authorization": "sk-0A810pRkyDOOtZ76DR1voGsMFAfMcJQTxZ5BYRAJHwPLzZnc"
    };

    const raw = JSON.stringify({
        model: model || "gpt-3.5-turbo",
        messages: chat,
        stream: false
    });

    const options = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.ohmygpt.com/v1/chat/completions", options);
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { chatAI };