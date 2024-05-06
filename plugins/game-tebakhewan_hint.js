let handler = async (m, { conn }) => { 
     conn.tebakhewan = conn.tebakhewan ? conn.tebakhewan : {} 
     let id = m.chat 
     if (!(id in conn.tebakhewan)) throw false 
     let json = conn.tebakhewan[id][1] 
     conn.reply(m.chat, '```' + json.title.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
handler.customPrefix = /^(hhew)$/i
handler.command = new RegExp
handler.group = true
module.exports = handler
