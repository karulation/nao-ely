// import uploadImage from '../../lib/uploadImage.js'

// let handler = async (m, { conn, args, usedPrefix, command }) => {
// 	let q = m.quoted ? m.quoted : m
// 	let mime = (q.msg || q).mimetype || q.mediaType || ''
// 	if ((/image/g.test(mime) && !/webp/g.test(mime))) {
// 		try {
// 			let img = await q.download?.()
// 			let out = await uploadImage(img)
// 			let res = await fetch(`https://api.lolhuman.xyz/api/nsfwcheck?apikey=${lolApi}&img=${out}`)
// 			let json = await res.json()
// 			if (json.status != '200') throw `Feature Error!`
// 			let get_result = json.result
// 			let is_nsfw = 'No'
// 			if (Number(get_result.replace("%", "")) >= 50) is_nsfw = 'Yes'
// 			m.reply(`Is NSFW? *${is_nsfw}*\n\nNSFW Score : *${get_result}*`)
// 		} catch (e) {
// 			console.log(e)
// 			m.reply('Fitur Error!')
// 		}
// 	} else m.reply(`Send picture with caption *${usedPrefix + command}* or tag a picture`)
// }

// handler.help = ['checknsfw']
// handler.tags = ['information']
// handler.command = /^(ch?ec?k)nsfw|nsfw(ch?ec?k)$/i

// handler.premium = true
// handler.limit = true

// export default handler
