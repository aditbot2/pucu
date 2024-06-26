let fetch = require('node-fetch')
let timeout = 60000
let poin = 1500
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {}
    let id = m.chat
    if (id in conn.tebaksurah) {
        conn.reply(m.chat, 'Masih Ada Soal Yang Belum Terjawab', conn.tebaksurah[id][0])
        throw false
    }

    let ran = 6236
    let res = await fetch('https://api.alquran.cloud/v1/ayah/' + ran.getRandom() + '/ar.alafasy')
    if (res.status !== 200) throw await res.text()
    let result = await res.json()
    let json = result.data
    if (result.code == '200') {
    // if (!json.status) throw json
    let caption = `*${command.toUpperCase()}*
Number In Surah: ${json.numberInSurah}
By: ${json.edition.name} ${json.edition.englishName}

Waktu *${(timeout / 1000).toFixed(2)} Detik*
Ketik *hsur* Untuk Bantuan
Bonus: ${poin} XP
*‼️REPLY SOAL UNTUK MENJAWAB‼️* `.trim()

let captu = `
*${json.surah.englishName}*

*INFORMATION*
Surah Number: ${json.surah.number}
Surah Name: ${json.surah.name} ${json.surah.englishName}
Eng Name: ${json.surah.englishNameTranslation}
Number Of Ayahs: ${json.surah.numberOfAyahs}
Type: ${json.surah.revelationType}
`

    conn.tebaksurah[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (conn.tebaksurah[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah *${captu}*`, )
            delete conn.tebaksurah[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.audio, 'coba-lagi.mp3', '', m)
    } else if (result.code == '404') {
    m.reply(`*Ulangi! Command ${usedPrefix + command} Karena ${json.data}*`)
    }
}
handler.customPrefix = /^(tebaksurah)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
