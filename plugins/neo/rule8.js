import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
        var textMessage = '*Rule Number 8: No kpop/kdrama things (we dont hate but this is anime community)*\n\nRule 8 states that members are not allowed to post anything related to Kpop or Kdrama in the anime community. This does not mean that the community hates Kpop or Kdrama, but the focus of the community is on anime, so anything outside of that is not allowed.\n\nThe reason for this rule is to maintain the focus and integrity of the community. Posting content related to Kpop or Kdrama may distract members from the main purpose of the community, which is to discuss and enjoy anime-related content.\n\nIt is important to respect the communitys guidelines and focus on the content that is relevant to the communitys interests. If members wish to discuss or share content related to Kpop or Kdrama, they can do so in other communities or groups that are dedicated to those topics.';
        
        await conn.sendFile(m.chat, media, '', textMessage, m);
    } catch (e) {
        m.reply('An error occurred, please contact Karu.');
        console.error(e);
    }
};

handler.help = ['rule8'];
handler.tags = ['neo'];
handler.command = /^(rule8)$/i;

export default handler;
