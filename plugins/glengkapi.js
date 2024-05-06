let fetch = require('node-fetch')
let timeout = 60000
let poin = 300
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.lengkapi = conn.lengkapi ? conn.lengkapi : {}
    let id = m.chat
    if (id in conn.lengkapi) {
conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.lengkapi[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/aditbot2/patrikmon/master/json/lengkapikalimat.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `> *${json.pertanyaan}*

${readMore}
Bonus: Rp ${poin} 💸
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *hleng* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
    `.trim()
    conn.lengkapi[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
if (conn.lengkapi[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`,)
            delete conn.lengkapi[id]
        }, timeout)
    ]
} 
handler.customPrefix = /^(lengkapikalimat)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)