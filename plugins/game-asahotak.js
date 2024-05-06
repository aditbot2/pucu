let fetch = require('node-fetch')

let timeout = 180000
let poin = 500
let tiketcoin = 1
let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
        throw false
    }
let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *ao* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️*
`.trim()
    conn.asahotak[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.asahotak[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, )
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(asahotak)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
