let handler = async (m, { conn }) => {
    let ownerNumber = "60177637943";
    let ownerName = "Owner"; // Change this if you want a specific name

    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${ownerName};;;\nFN:${ownerName}\nTEL;type=Mobile;waid=${ownerNumber}:${ownerNumber}\nEND:VCARD`;

    await conn.sendMsg(m.chat, { 
        contacts: {  
            displayName: ownerName, 
            contacts: [{ vcard }] 
        } 
    }, { quoted: m });
}

handler.menugroup = ['owner'];
handler.tagsgroup = ['group'];
handler.command = /^(owner|creator)$/i;

export default handler;
