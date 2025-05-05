import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var textMessage = `🚫✨ *IMPORTANT COMMUNITY NOTICE – Respect & Sensitivity Reminder* ✨🚫\n\nDear Neo Citizens,\n\nPlease be reminded to *refrain from sharing or posting any content that involves blackface*, whether it's from shows, memes, edited images, or artistic depictions — including anime characters.\n\n🛑 *What is Blackface?*\nBlackface is a harmful and racist practice historically used to mock and dehumanize Black individuals. Even when presented as a joke or fan edit (such as darkening characters like *Furina*), it promotes damaging stereotypes and causes real emotional harm.\n\n💬 *Why It Matters:*\nNeo Anime Community stands for:\n- 🫱‍🫲 *Respect*\n- 🌏 *Inclusivity*\n- 🎭 *Cultural Sensitivity*\n\nWe do *not tolerate racism in any form*, even if it's masked as humor or creativity.\n\n❓ *Not Sure? Ask First!*\nIf you’re unsure whether something might be offensive — especially when it touches on race — please ask a moderator before posting. It’s always better to be safe and considerate.\n\n⚠️ *Violations of this policy may result in a warning or removal from the community.*\n\nLet’s continue to build a safe, diverse, and welcoming space for all 💙\n\nThank you for your understanding and cooperation!\n\n— *Neo Anime Community Staff Team*`;
        var media = "https://telegra.ph/file/aa321d2670c88d1bc835d.jpg";

        await conn.sendFile(m.chat, media, "", textMessage, m);
    } catch (e) {
        m.reply("An error occurred, please contact Karu.");
        console.error(e);
    }
};

handler.help = ["noblackface"];
handler.tags = ["Neo Notice"];
handler.command = /^(noblackface)$/i;

export default handler;
