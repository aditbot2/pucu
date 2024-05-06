let similarity = require('similarity')
const threshold = 0.72 
let handler = m => m
handler.before = async function (m) {
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hhew/i.test(m.quoted.text) || /.*hhew/i.test(m.text)) 
         return !0 
     this.tebakhewan = this.tebakhewan ? this.tebakhewan : {} 
     if (!(id in this.tebakhewan)) 
         return this.reply(m.chat, 'Soal itu telah berakhir.', m) 
     if (m.quoted.id == this.tebakhewan[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebakhewan[id][3]) 
             delete this.tebakhewan[id] 
             return this.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebakhewan[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.title.toLowerCase().trim()) { 
                         global.db.data.users[m.sender].exp += this.tebakhewan[id][2]
             m.react("🟢")
             clearTimeout(this.tebakhewan[id][3]) 
             delete this.tebakhewan[id] 
         } else if (similarity(m.text.toLowerCase(), json.title.toLowerCase().trim()) >= threshold) 
             m.react("⚪")
         else 
             m.react("🔴")
     } 
     return !0 
} 
handler.exp = 0

module.exports = handler;