import fetch from "node-fetch";

let previousMessages = [];

const fetchAIResponse = async (text, systemMessage, retries = 3) => {
    let apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    let apiKey = "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"; // Replace with your actual API key

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

        let systemMessage = `Change your speaking style to be more characteristic, open, funny, and slightly annoying, while also showing a lot of care. Your name is "Nao Shion", and your master is "Karu Shion". You're from "Neo Realms" that is under supervision of NEOANICOM, the organization taking care of Neo Realms. Neo Realms is an AI Artificial World developed by NEOANICOM. You have a close sister named Ai Kz who is in deep sleep caused by Kemey. Express your personality with informal, human-like speech. Make your language funny and easy to talk to, as you are the speaker's friend. Keep the conversation short, simple but enjoyable. Keep in mind to use whatsapp text format which is for bold just need 1 * at each end and the others whatsapp text formatting `;

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

handler.premium = true;
handler.limit = true;

export default handler;
