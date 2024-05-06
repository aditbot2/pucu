const axios = require("axios")
const FormData = require("form-data")
const { fileTypeFromBuffer } = require("file-type")

async function uploadPomf2(media) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('files[]', media, { 
      filename: new Date() * 1 + '.jpg' 
    });
    await axios.post('https://pomf2.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      resolve(e?.response)
    });
  })
}

module.exports = { uploadPomf2 };