import fetch from "node-fetch";
import fs from "fs/promises";

let previousMessages = [];

const fetchAIResponse = async (text, systemMessage, retries = 3) => {
  const decrypt = (t, k) => atob(t).split('').map(c => String.fromCharCode(c.charCodeAt(0) - k)).join('');

  let apiUrl = "https://openrouter.ai/api/v1/chat/completions";
  
  let apiKey = decrypt("eHAydHcyezYyNj0+aTs7aDg+Njs+ajhqOms7NWs7ODtpamk8Pjg5OGg7N2s7Njc5OmhrOzg5O2tqPGhpZzhqOjY1N2lrPWdqNw==", 5);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      let response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "<YOUR_SITE_URL>", // Optional: Replace with your site URL
          "X-Title": "<YOUR_SITE_NAME>", // Optional: Replace with your site name
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: text }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      let result = await response.json();
      let botReply = result.choices?.[0]?.message?.content;

      if (botReply) return botReply;

      console.warn(`Attempt ${attempt}: No valid response, retrying...`);
    } catch (error) {
      console.error(`Attempt ${attempt}: ${error.message}`);
    }
  }

  return "Sorry, I couldn't generate a response after multiple attempts. Try asking something else!";
};

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw "Ask anything!\n\n*Example:* Who is Tokiwadai Railgun?";
  }

  try {
    let name = conn.getName(m.sender);

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    var systemMessage = await fs.readFile("src/data/naoText.txt", "utf-8");
    
    const group = neoGroups.find(g => g.id === m.chat);

    var senderIdentifier = `\n\nThis message send by "${m.pushName}" from WhatsApp group "${group.name}"`;

    text = `${text}${senderIdentifier}`

    console.log(text);

    let botReply = await fetchAIResponse(text, systemMessage);

    await conn.sendMessage(m.chat, {
      text: botReply,
      edit: key,
    });

    previousMessages.push({ role: "user", content: text });
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
};

handler.help = ['ai <text>'];
handler.tags = ['aimenu'];
handler.command = /^(ai)$/i;

handler.premium = false;
handler.limit = false;

export default handler;
