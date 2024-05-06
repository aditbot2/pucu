let fetch = require('node-fetch')
let timeout = 60000
let poin = 800
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (id in conn.tebaklirik) {
        conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebaklirik[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]

  let caption = `*${json.soal}*

Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *hlirik* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
    `.trim()
    conn.tebaklirik[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklirik[id])  conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, )
            delete conn.tebaklirik[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(tebaklirik)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler

