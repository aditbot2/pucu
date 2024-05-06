let fetch = require('node-fetch')
let timeout = 60000
let poin = 400
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (id in conn.tebakgambar) {
conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebakgambar[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/aditbot2/patrikmon/master/json/tebakgambar.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  
    let caption = `
${readMore}
Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *hgam* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
    `.trim()
    conn.tebakgambar[id] = [
        await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }),
        json, poin,
        
        setTimeout(() => {
        
if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, )
            delete conn.tebakgambar[id]
        }, timeout)
    ]
} 
handler.customPrefix = /^(tebakgambar)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
