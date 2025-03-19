import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var textMessage =
            "*⚠️ Notice: Message Deletion Policy ⚠️*\n" +
            "Failure to delete your message after receiving a warning will result in removal from the group.\n" +
            "_Kegagalan memadam mesej selepas diberi amaran akan menyebabkan anda akan dikeluarkan dari kumpulan._\n" +
            "\n" +
            "Please respect the rules and admin instructions to maintain harmony in the community.\n" +
            "_Sila hormati peraturan dan arahan admin untuk menjaga keharmonian komuniti._";
        var media = "https://telegra.ph/file/aa321d2670c88d1bc835d.jpg";

        await conn.sendFile(m.chat, media, "", textMessage, m);
    } catch (e) {
        m.reply("An error occurred, please contact Karu.");
        console.error(e);
    }
};

handler.help = ["warningnotice"];
handler.tags = ["neo"];
handler.command = /^(warningnotice)$/i;

export default handler;
