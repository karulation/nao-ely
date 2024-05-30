import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 9:  harassing other members*\n\nRule 9 is a crucial rule that aims to ensure a safe and comfortable environment for all members, especially female members, who might be vulnerable to harassment. The rule strictly prohibits any form of harassment towards other members, and any violation of this rule may result in an immediate kick from the group.\n\nHarassment can take many forms, including but not limited to verbal harassment, sexual harassment, cyberbullying, and stalking. This rule applies to all members regardless of gender, but it is particularly important for female members who may face more aggressive behavior from some male members.\n\nThe rule aims to create a community where everyone feels respected and safe. Members should not engage in any behavior that makes others feel uncomfortable or harassed. If a member feels harassed by another member, they are encouraged to report the incident to any admin, who will take the necessary action to resolve the issue.\n\nIn summary, Rule 9 aims to promote a safe and respectful environment for all members, and any form of harassment towards other members, especially female members, will not be tolerated.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule9'];
handler.tags = ['neo'];
handler.command = /^(rule9)$/i;

export default handler;
