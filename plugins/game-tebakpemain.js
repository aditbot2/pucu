let fetch = require('node-fetch')
let timeout = 60000 
let poin = 1000
let handler = async (m, { conn, command, usedPrefix }) => { 
  
     conn.tebakpemain = conn.tebakpemain ? conn.tebakpemain : {} 
     let id = m.chat 
     if (id in conn.tebakpemain) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakpemain[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/JarPyth/scrape/main/games/tebakpemain.json')).json() 
   let json = src[Math.floor(Math.random() * src.length)] 
     let caption = `
Posisi : ${json.posisi}
Negara : ${json.negara}
ga : ${json.liga}
Klub : ${json.klub}
Nomor Punggung : ${json.nopung}
 
Bonus: Rp ${poin} 💸 
Timeout *${(timeout / 1000).toFixed(2)} detik* 
Ketik *hbol* untuk bantuan
*‼️REPLY SOAL UNTUK MENJAWAB‼️*
     `.trim() 
     conn.tebakpemain[id] = [ 
         await conn.reply(m.chat, caption, m),
         json, poin, 
         setTimeout(() => { 
             if (conn.tebakpemain[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, ) 
             delete conn.tebakpemain[id] 
         }, timeout) 
     ] 
} 
handler.customPrefix = /^(tebakpemain)$/i
handler.command = new RegExp
handler.group = false
module.exports = handler
