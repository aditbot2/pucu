let fetch = require('node-fetch')
let timeout = 60000
let poin = 750
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
                conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebakbendera[id][0])
        throw false
    }
      
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *hben* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 

    `.trim()
    conn.tebakbendera[id] = [
        await await conn.sendFile(m.chat, json.img, '', caption, m, null, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id])  conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.name}*`, )
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(tebakbendera)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
