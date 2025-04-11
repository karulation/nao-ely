import fetch from "node-fetch";
import fs from "fs/promises";

let previousMessages = [];

const cooldown = new Set(); // To prevent double broadcast

const fetchAIResponse = async (text, systemMessage, retries = 3) => {
  let apiKey = routerapi;

  let apiUrl = "https://openrouter.ai/api/v1/chat/completions";

  // Prevent command spam within 10 seconds
  if (cooldown.has(m.text)) {
    return;
  }
  cooldown.add(m.text);
  setTimeout(() => cooldown.delete(m.text), 10000); // 10 sec cooldown

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

  return "Sorry, I'm on cooldown right now. Try again after few hours!";
};

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw "Ask anything!\n\n*Example:* Who is Tokiwadai Railgun?";
  }

  try {
    let name = conn.getName(m.sender);
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
    let groupName = groupMetadata ? groupMetadata.subject : "Private Chat";

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    var systemMessage = await fs.readFile("src/data/naoText.txt", "utf-8");
    var contactsText = await fs.readFile("src/data/contacts.txt", "utf-8");
    var naoDetail = await fs.readFile("src/data/naoDetail.txt", "utf-8");

    var senderIdentifier = `IMPORTANT! KEEP IN MIND : This message was sent by "${name}" from WhatsApp group "${groupName}"\n\nUser message that need to be reply: `;

    text = `${senderIdentifier}${text}`;

    console.log(text);

    let botReply = await fetchAIResponse(
      text,
      systemMessage + contactsText + naoDetail
    );

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

handler.help = ["ai <text>"];
handler.tags = ["aimenu"];
handler.command = /^(ai)$/i;

handler.premium = false;
handler.limit = false;

export default handler;
