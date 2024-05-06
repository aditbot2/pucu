let fetch = require('node-fetch')

let timeout = 50000
let poin = 500
let tiketcoin = 1
let handler = async (m, { conn, usedPrefix }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}
Tipe : ${json.tipe}

Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *susunhelp* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️*
`.trim()
    conn.susunkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, )
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(susunkata)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
