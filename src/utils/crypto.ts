import CryptoJS from 'crypto-js';

class Crypto {
    constructor() {

    }

    // SHA256加密
    encryptSHA256(message) {
        const hash = CryptoJS.SHA256(message);
        const result = hash.toString(CryptoJS.enc.Base64);
        return result
    }

    // AES加密
    encryptAES(message, key) {

    }

    // AES解密
    decryptAES(message, key) {

    }
}

export default new Crypto();