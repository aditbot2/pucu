const { siapakahaku } = require('@bochilteam/scraper')
let fetch = require('node-fetch')
let timeout = 60000
let poin = 324
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.siapakahaku[id][0])
        throw false
    }

    const json = await siapakahaku()
    let caption = `
> Siapakah aku? ${json.soal}

${readMore}
Bonus: Rp ${poin} 💸
Waktu *${(timeout / 1000).toFixed(2)} Detik*
Ketik *wholi* Untuk Bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️* 
`.trim()
    conn.siapakahaku[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${json.jawaban}*`, )
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.customPrefix = /^(siapaaku)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)