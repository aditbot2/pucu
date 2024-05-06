const fetch = require("node-fetch");
const { fileURLToPath, URL } = require('url');
const chalk = require('chalk');
const fs = require('fs');

async function UploadToIBB(url, expiration, ibbkey) {
    let data = await fetch("https://api.imgbb.com/1/upload?key=" + ibbkey + "&expiration=" + expiration + "&image=" + url).then(res => res.json());
    return data;
}

module.exports = { UploadToIBB };