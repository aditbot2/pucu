let fetch = require('node-fetch')

let timeout = 60000 
let poin = 500
let handler = async (m, { conn, usedPrefix, command }) => {
    conn.tebakanime = conn.tebakanime ? conn.tebakanime : {}
    let id = m.chat
    if (id in conn.tebakanime) {
        conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebakanime[id][0])
        throw false
    }

    let src = await (await fetch('https://raw.githubusercontent.com/unx21/ngetezz/main/src/data/nyenyenye.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
Bonus: Rp ${poin} 💸
Waktu *${(timeout / 1000).toFixed(2)} Detik*
Ketik *wa* Untuk Bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
`.trim()
    conn.tebakanime[id] = [
        await await conn.sendFile(m.chat, json.img, '', caption, m, null, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebakanime[id]) await conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, )
            delete conn.tebakanime[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(tebakanime)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler


