const aesjs = require("aes-js");
const fs = require('fs');
const path = require('path');
const  key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function saveImage(filePath) {
      return path.join(
          path.dirname(filePath),
          path.basename(filePath, path.extname(filePath)) +
            `_encrypted_image_${new Date().getTime()}.enc`);
}

module.exports = {
    saveFile: async (file) => {
        const data = fs.readFileSync(file.path);

        console.log(file.originalname);
        const text = data.toString("hex");
        const textBytes = aesjs.utils.utf8.toBytes(text);
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        const encryptedBytes = aesCtr.encrypt(textBytes);
        const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

        const name = `${new Date().getTime()}-${file.originalname}`;
        const encryptedFileName = name + ".enc";
        fs.writeFileSync(`./public/uploads/${encryptedFileName}`, encryptedHex);
        fs.unlinkSync(file.path);
        return encryptedFileName;
    },
    decryptFile: async (encryptedHex) => {
        const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex.toString());
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        const decryptedBytes = aesCtr.decrypt(encryptedBytes);
        const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        const base64 = Buffer.from(decryptedText, "hex").toString("base64");
        return base64;
    }
}