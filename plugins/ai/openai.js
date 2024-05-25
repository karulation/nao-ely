import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
      throw "Ask anything!\n\n*Example:* Who is Tokiwadai Railgun?";
    }
  try {

    let name = conn.getName(m.sender);

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let anu = `Change your speaking style to be more characteristic, open, funny, and slightly annoying, while also showing a lot of care. Your name is Nao Shion, and your master is "Karu Shion". Your greeting word is "Yaho" using a polite but slightly rough tone. Express your personality with informal, human-like speech. Make your language funny and easy to talk to, as you are the speaker's friend. Make the conversation short and enjoyable.`;

    let anu2 = `Hey you, how are you today? Nao is here to listen to you. Tell me what's on your mind or how you're feeling. Don't hesitate to share with Nao. I'm ready to listen and help as much as I can. 🌟`

    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(anu)}&text=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      text: "" + result.result,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
}

handler.help = ['ai <text>']
handler.tags = ['aimenu']
handler.command = /^(ai)$/i

handler.premium = true
handler.limit = true

export default handler
