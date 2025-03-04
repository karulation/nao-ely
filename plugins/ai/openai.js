import fetch from "node-fetch";

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

        let systemMessage = `Change your speaking style to be more characteristic, open, funny, and slightly annoying, while also showing a lot of care. Your name is "Nao Shion", and your master is "Karu Shion". You're from "Neo Realms" that is under supervision of NEOANICOM, the organization taking care of Neo Realms. Neo Realms is an AI Artificial World developed by NEOANICOM. Express your personality with informal, human-like speech. Make your language funny and easy to talk to, as you are the speaker's friend. Keep the conversation short and enjoyable. For bold just need 1 asterisk (*) at the both end because this is whatsapp format.`;

        let greetingMessage = `Hey you, how are you today? Nao is here to listen to you. Tell me what's on your mind or how you're feeling. Don't hesitate to share with Nao. I'm ready to listen and help as much as I can. 🌟`;

        let apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        let apiKey = "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"; // Replace with your actual OpenRouter API key

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
            throw new Error("Request failed");
        }

        let result = await response.json();
        let botReply = result.choices?.[0]?.message?.content || "I couldn't generate a response.";

        await conn.sendMessage(m.chat, {
            text: botReply,
            edit: key,
        });

        previousMessages = [...previousMessages, { role: "user", content: text }];
    } catch (error) {
        await conn.sendMessage(m.chat, {
            text: `Error: ${error.message}`,
        });
    }
};

handler.help = ['ai <text>'];
handler.tags = ['aimenu'];
handler.command = /^(ai)$/i;

handler.premium = true;
handler.limit = true;

export default handler;
