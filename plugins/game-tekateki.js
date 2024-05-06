let fetch = require('node-fetch')
let timeout = 60000
let poin = 400
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tekateki[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]

    let caption = `
${json.soal}

Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *htek* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
    `.trim()
    conn.tekateki[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
if (conn.tekateki[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, )
            delete conn.tekateki[id]
        }, timeout)
    ]
} 
handler.customPrefix = /^(tekateki)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
