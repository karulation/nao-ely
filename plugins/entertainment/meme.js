let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let response = await fetch(`https://meme-api.com/gimme`);  // Fetches a random meme
    let json = await response.json();
    let memeUrl = json.url;

    let fimg = await fetch(memeUrl); 
    let fimgb = Buffer.from(await fimg.arrayBuffer());
    if (Buffer.byteLength(fimgb) < 22000) throw Error();
    await conn.sendMsg(m.chat, { image: fimgb, caption: `_© here your meme_` }, { quoted: m });
  } catch (e) {
    // Handle errors (optional)
    m.reply(`There's something wrong, try again later.`);
  }
};

handler.help = ['meme']
handler.tags = ['entertainment']
handler.command = /^((random)?meme)$/i

handler.premium = true
handler.limit = true

export default handler
