const axios = require("axios")
const cheerio = require("cheerio")

async function snack(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post("https://getsnackvideo.com/results", new URLSearchParams({ id: url }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
            });
            const $ = cheerio.load(data);
            const result = {
                status: 200,
                thumbnail: $('.img_thumb img').attr('src'),
                no_wm: $('a.download_link.without_watermark').attr('href')
            };
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { snack };