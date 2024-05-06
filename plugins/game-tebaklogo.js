let fetch = require('node-fetch')
let timeout = 60000
let poin = 400
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {}
    let id = m.chat
    if (id in conn.tebaklogo) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklogo[id][0])
        throw false
    }
    let res = await fetch(`https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json`)
    let src = await res.json()
    let Apps = src[Math.floor(Math.random() * src.length)]
    let json = { hasil: Apps }
    let caption = `
Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *hlog* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️*
    `.trim()
    conn.tebaklogo[id] = [
        await conn.sendFile(m.chat, json.hasil.data.image, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklogo[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.hasil.data.jawaban}*`, )
            delete conn.tebaklogo[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(tebaklogo)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
