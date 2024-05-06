let similarity = require('similarity')

const threshold = 0.72 
let handler = m => m
handler.before = async function (m) {
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hbol/i.test(m.quoted.text) || /.*hbol/i.test(m.text)) 
         return true
     this.tebakpemain = this.tebakpemain ? this.tebakpemain : {} 
     if (!(id in this.tebakpemain)) 
         return conn.reply(m.chat, `Soal itu telah berakhir.`, m) 
     if (m.quoted.id == this.tebakpemain[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebakpemain[id][3]) 
             delete this.tebakpemain[id] 
             return conn.reply(m.chat, '🏳️ Menyerah',  m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebakpemain[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) { 
            global.db.data.users[m.sender].exp += this.tebakpemain[id][2]
      
             m.react("🟢")
             clearTimeout(this.tebakpemain[id][3]) 
             delete this.tebakpemain[id] 
         } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) 
             m.react("⚪")
         else 
             m.react("🔴")
     } 
     return true
} 
handler.exp = 0

module.exports = handler;