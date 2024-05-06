let fetch = require('node-fetch')
const winScore = 200
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih Ada Kuis Yang Belum Terjawab', this.game[id].msg)
        throw false
    }
        let src = await (await fetch('https://raw.githubusercontent.com/aditbot2/patrikmon/master/json/family100.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
> *FAMILY 100*

*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* Jawaban${json.jawaban.find(v => v.includes(' ')) ? `

`: ''}
\n_ketik *nyerah* untuk menghentikan game_
    `.trim()
    this.game[id] = {
        id,
        msg: await m.reply(caption),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.customPrefix = /^(mulai|start)$/i
handler.command = new RegExp
module.exports = handler