(async () => {
require('./config')

const { default: useSingleFileAuthState, useMultiFileAuthState, makeInMemoryStore, makeWALegacySocket, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, PHONENUMBER_MCC } = require('@whiskeysockets/baileys')
const WebSocket = require('ws')
const path = require('path')
const pino = require('pino')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const os = require('os')
const { randomBytes } = require('crypto')
const moment = require("moment-timezone")
const time = moment.tz('Asia/Makassar').format("HH:mm:ss")
const chalk = require('chalk')
const { color } = require('./lib/color')
const NodeCache = require("node-cache")
//const store = require('./lib/store')
const storeSys = require('./lib/store2')
let simple = require('./lib/simple')

var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
//const store = storeSys.makeInMemoryStore() // store use multiauth
const PORT = process.env.PORT || 3000

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.timestamp = {
  start: new Date
}

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎!./#\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : /mongodb/i.test(opts['db']) ? new mongoDB(opts['db']) : new JSONFile(`${opts[0] ? opts[0] + '_' : ''}database.json`))

DATABASE = db
loadDatabase = async function loadDatabase() {
	if (db.READ) return new Promise((resolve) => setInterval(function() {
		(!db.READ ? (clearInterval(this), resolve(db.data == null ? loadDatabase() : db.data)) : null)
	}, 1 * 1000))
	if (db.data !== null) return
	db.READ = true
	await db.read()
	db.READ = false
	db.data = {
		users: {},
		chats: {},
		stats: {},
		msgs: {},
		sticker: {},
		settings: {},
		respon: {},
		...(db.data || {})
	}
 db.chain = _.chain(db.data)
}
loadDatabase()

 const useStore = !process.argv.includes('--store')
const usePairingCode = !process.argv.includes('--pairing')
const useMobile = process.argv.includes('--mobile')

var question = function(text) {
return new Promise(function(resolve) {
rl.question(text, resolve);
});
};
const rl = require('readline').createInterface(process.stdin, process.stdout)

// Store
const store = useStore ? makeInMemoryStore({ level: 'silent' }) : undefined
store?.readFromFile('./ucupnetwork.json')
setInterval(() => { // save every 10s
store?.writeToFile('./ucupnetwork.json')
}, 10_000)

// Multi auth
const { version, isLatest } = await fetchLatestBaileysVersion()
let { state, saveCreds } = await useMultiFileAuthState(path.resolve('./ucupsesi'))
const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"

const connectionOptions = {
        version,
        logger: pino({ level: 'silent' }), 
        printQRInTerminal: !usePairingCode, 
        browser: ['Linux', 'Chrome', ''],
        auth: { 
         creds: state.creds, 
         keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
             level: 'silent', 
             stream: 'store' 
         })), 
     },
     getMessage: async key => {
    		const messageData = await store.loadMessage(key.remoteJid, key.id);
    		return messageData?.message || undefined;
	},
  generateHighQualityLinkPreview: true, 
	      patchMessageBeforeSending: (message) => {
                const requiresPatch = !!(
                    message.buttonsMessage 
                    || message.templateMessage
                    || message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }

               return message;
            }, 
       msgRetryCounterCache, // Resolve waiting messages
   defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
} 

	conn = simple.makeWASocket(connectionOptions)
	conn.isInit = false
	

	// Pairing
	if (usePairingCode && !conn.authState.creds.registered) {
		if (useMobile) throw new Error('Cannot use pairing code with mobile api')
		const { registration } = { registration: {} }
		let phoneNumber = ''
		do {
			phoneNumber = await question(chalk.blueBright('Input a Valid number start with region code. Example : 62xxx:\n'))
		} while (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)))
		rl.close()
		phoneNumber = phoneNumber.replace(/\D/g,'')
		console.log(chalk.bgWhite(chalk.blue('Generating Code...')))
		setTimeout(async () => {
			let code = await conn.requestPairingCode(phoneNumber)
			code = code?.match(/.{1,4}/g)?.join('-') || code
			console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
		}, 3000)
	}
	
	if (!opts['test']) {
		if (db) setInterval(async () => {
			if (global.db.data) await db.write()
			if (opts['autocleartmp'] && (support || {}).find)(tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
		}, 30 * 1000)
	}
	if (opts['server']) require('./server')(conn, PORT)

	function clearTmp() {
		const tmp = [os.tmpdir(), path.join(__dirname, './tmp')]
		const filename = []
		tmp.forEach(dirname => fs.readdirSync(dirname).forEach(file => filename.push(path.join(dirname, file))))
		filename.map(file => (
			stats = fs.statSync(file),
			stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3) ?
			fs.unlinkSync(file) :
			null))
	}

	setInterval(async () => {
		await exec("rm -rf ./tmp/*")
	}, 60 * 60 * 1000)

	async function connectionUpdate(update) {
	    const { connection, lastDisconnect, isNewLogin } = update
		if (connection == 'connecting') console.log(chalk.yellowBright('Trying To Connect..'))
		if (connection == 'close') console.log(chalk.red('Connection lost..'))
		if (isNewLogin) conn.isInit = true
		if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
			console.log(reloadHandler(true))
			timestamp.connect = new Date
		}
		if (db.data == null) await loadDatabase()
		console.log(JSON.stringify(update, null, 4))

    function getIpAddress() {
		const interfaces = os.networkInterfaces();
		for (const key in interfaces) {
		for (const iface of interfaces[key]) {
		if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'Unknown';
}

if (update.receivedPendingNotifications) {
const ipAddress = getIpAddress();
const deviceName = os.hostname();
/*const message = `Hi Sensei, I successfully connected

*My Status*
◦ *Ip Address*: ${ipAddress}
◦ *Os*: ${os.platform()} ${os.release()}
◦ *Device*: ${deviceName}
◦ *Name bot*: ${global.set.namebot}
◦ *Connected time*: ${new Date().toLocaleString()}`;*/
conn.sendMessage(`6283133162295@s.whatsapp.net`, { text: `Bot Sukses Tersambung` });
}
}

	process.on('uncaughtException', console.error)
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

	let isInit = true,
		handler = require('./handler')
    	reloadHandler = function(restatConn) {
		let Handler = require('./handler')
		if (Object.keys(Handler || {}).length) handler = Handler
		if (restatConn) {
			try {
				conn.ws.close()
			} catch {}
			conn = {
				...conn,
				...simple.makeWASocket(connectionOptions)
			}
		}
		if (!isInit) {
			conn.ev.off('messages.upsert', conn.handler)
			conn.ev.off('group-participants.update', conn.onParticipantsUpdate)
			conn.ev.off('message.delete', conn.onDelete)
			conn.ev.off('connection.update', conn.connectionUpdate)
			conn.ev.off('creds.update', conn.credsUpdate)
		}

		conn.welcome = 'Hallo *@user* selamat datang di grub *@subject*'
		conn.bye = 'Sayonaraa *@user* semoga tenang di alam sana'
		conn.spromote = '@user is now admin'
		conn.sdemote = '@user is now not an admin'
		conn.handler = handler.handler.bind(conn)
		conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn)
		conn.onDelete = handler.delete.bind(conn)
		conn.connectionUpdate = connectionUpdate.bind(conn)
		conn.credsUpdate = saveCreds.bind(conn)

		conn.ev.on('messages.upsert', conn.handler)
		conn.ev.on('group-participants.update', conn.onParticipantsUpdate)
		conn.ev.on('message.delete', conn.onDelete)
		conn.ev.on('connection.update', conn.connectionUpdate)
		conn.ev.on('creds.update', conn.credsUpdate)
		isInit = false
		return true
	}

	let pluginFolder = path.join(__dirname, 'plugins')
	let pluginFilter = filename => /\.js$/.test(filename)
	plugins = {}
	for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
		try {
			plugins[filename] = require(path.join(pluginFolder, filename))
		} catch (e) {
			conn.logger.error(e)
			delete plugins[filename]
		}
	}
	console.log(Object.keys(plugins))
	
	reload = (_ev, filename) => {
		if (pluginFilter(filename)) {
			let dir = path.join(pluginFolder, filename)
			if (dir in require.cache) {
				delete require.cache[dir]
				if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
				else {
					conn.logger.warn(`deleted plugin '${filename}'`)
					return delete plugins[filename]
				}
			} else conn.logger.info(`requiring new plugin '${filename}'`)
			let err = syntaxerror(fs.readFileSync(dir), filename)
			if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
			else try {
				plugins[filename] = require(dir)
			} catch (e) {
				conn.logger.error(`error require plugin '${filename}\n${e}'`)
			} finally {
				plugins = Object.fromEntries(Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)))
			}
		}
	}
	Object.freeze(reload)
	fs.watch(path.join(__dirname, 'plugins'), reload)
	reloadHandler()

	async function _quickTest() {
		let test = await Promise.all([
			cp.spawn('ffmpeg'),
			cp.spawn('ffprobe'),
			cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
			cp.spawn('convert'),
			cp.spawn('magick'),
			cp.spawn('gm'),
			cp.spawn('find', ['--version'])
		].map(p => {
			return Promise.race([
				new Promise(resolve => {
					p.on('close', code => {
						resolve(code !== 127)
					})
				}),
				new Promise(resolve => {
					p.on('error', _ => resolve(false))
				})
			])
		}))
		let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
		console.log(test)
		let s = support = {
			ffmpeg,
			ffprobe,
			ffmpegWebp,
			convert,
			magick,
			gm,
			find
		}
		Object.freeze(support)

		if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
		if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
		if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
	}

	_quickTest().then(() => conn.logger.info('Quick Test Done')).catch(console.error)
console.log(color(time, "white"), color("Connecting...", "aqua"))
})()

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)]
}