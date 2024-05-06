const fetch = require("node-fetch")

const handler = async (m, { conn, text }) => {
	if (!text) return conn.reply(m.chat, `Mau nanya apa?`, m)
	try {
    let emsg = await conn.sendMessage(m.chat, {
    text: 'sedang mencari jawaban' 
  })
	const web = await fetch(`https://aemt.me/gpt4?text=${encodeURIComponent(text)}`)
	const result = await web.json()
	await conn.relayMessage(m.chat, {
             protocolMessage: { 
                 key: emsg.key, 
                 type: 14, 
                 editedMessage: { 
                     conversation: result.result
                 } 
             } 
         }, {})
	} catch (e) {
		conn.reply(m.chat, "Error: " + e.message, m)
	}
}
handler.command = /^(ai)$/i
module.exports = handler
