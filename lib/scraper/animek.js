const fs = require("fs");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const axios = require("axios");

async function toAnime(url) {
	return new Promise(async (resolve, reject) => {
		const formData = new FormData();
		formData.append("image-url", url);
		await axios
			.post("https://tools.revesery.com/image-anime/convert.php", formData, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				resolve(error?.response);
			});
	});
}

module.exports = { toAnime };