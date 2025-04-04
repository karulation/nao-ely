import fetch from "node-fetch";
import fs from "fs/promises";

let previousMessages = [];

const fetchAIResponse = async (text, systemMessage, retries = 3) => {
  let apiKey = routerapi;

  let apiUrl = "https://openrouter.ai/api/v1/chat/completions";

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      let response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "<YOUR_SITE_URL>", // Optional: Replace with your site URL
          "X-Title": "<YOUR_SITE_NAME>", // Optional: Replace with your site name
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: text },
          ],
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

  return "Sorry, I couldn't simulate the Hunger Games!";
};

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    var systemMessage = await fs.readFile("src/data/hgSimulate.txt", "utf-8");

    text = `
      Simulate based on this data: 
      Time: Night 1

      Alive :
          - Karu
          - Mio
          - Yamato
          - Hazu
          - Zen
          - Mui
          - Ren
          - Rika
          - Nyom
          - Ina
          - Syaz
          - Rin
          - Rei
          - Unknown sponsor
          - BlackMoon

      Dead in this round : 
          - Lesley
          - Riezu
          - Izumi
          - Shiroi
          - Aichan

      Dead : 
          - Lesley
          - Mentos
          - Piko
          - Riezu
          - Izumi
          - Shiroi
          - Aichan
          - Muisu
    `;

    let botReply = await fetchAIResponse(text, systemMessage);

    botReply = 'In Dev : ' + botReply;

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

// handler.help = [""];
// handler.tags = ["aimenu"];
handler.command = /^(simulatehg)$/i;

handler.premium = false;
handler.limit = false;

export default handler;
