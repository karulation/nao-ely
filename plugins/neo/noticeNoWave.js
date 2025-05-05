import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var textMessage = `*🚨 Important Notice: Please Avoid Using the Wave Feature in WhatsApp Voice Calls 🚨*\nDear Neo Members,\n\nWe kindly ask that you refrain from using WhatsApp’s new “Wave” feature during group voice calls. This feature sends a notification to all group members, which can be disruptive — especially at night when members are trying to relax or sleep.\n\n💡 Why is this important?\n- Neo groups have 700+ members combined, and even one wave can trigger notifications for everyone. \n- Imagine being woken up late at night because of a wave — not fun, right?\n\n📵 To keep our community experience peaceful and respectful for all time zones and lifestyles, please avoid using this feature in Neo-related groups.\n\n💬 Prefer chatting or calling?\nWe highly recommend using our Discord server for voice chats and hangouts. It’s better suited for real-time communication without disturbing others. Join us there!\n🔗 https://discord.gg/Q2a96xkwtM\n\nThank you for your understanding and cooperation!\n— Mui`;
        var media = "https://telegra.ph/file/aa321d2670c88d1bc835d.jpg";

        await conn.sendFile(m.chat, media, "", textMessage, m);
    } catch (e) {
        m.reply("An error occurred, please contact Karu.");
        console.error(e);
    }
};

handler.help = ["nowave"];
handler.tags = ["Neo Notice"];
handler.command = /^(nowave)$/i;

export default handler;
