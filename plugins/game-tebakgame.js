let fetch = require('node-fetch')
let timeout = 60000
let poin = 250
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakgame = conn.tebakgame ? conn.tebakgame : {}
    let id = m.chat
    if (id in conn.tebakgame) {
conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebakgame[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  
    let caption = `
Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *hmeg* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
    `.trim()
    conn.tebakgame[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m, null, m),
        json, poin,
        
        setTimeout(() => {
        
if (conn.tebakgame[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, )
            delete conn.tebakgame[id]
        }, timeout)
    ]
} 
handler.customPrefix = /^(tebakgame)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
