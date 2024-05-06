let fetch = require('node-fetch')

let timeout = 60000
let poin = 450
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
   let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `${json.soal}
    
Bonus: Rp ${poin} 💸    
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *teka* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️*
`.trim()
    conn.tebakkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, )
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(tebakkata)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
