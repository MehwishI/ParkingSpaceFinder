const crypto = require('crypto');

const getAlgorithm = 'aes-256-cbc';
const getEncKey = process.env.ENCRYPTION_KEY;
const getIv = crypto.randomBytes(16);

const getEncrytedData = (getData) =>{
    
    const getCipher = crypto.createCipheriv(getAlgorithm, Buffer.from(getEncKey), getIv);
    let getEncrypted = getCipher.update(JSON.stringify(getData), 'utf8', 'hex');
    getEncrypted += getCipher.final('hex');
    return { iv: getIv.toString('hex'), encrytedData: getEncrypted };
};

const getDecryptedData = (getEncrytedObj) => {
    const getIv = Buffer.from(getEncrytedObj.iv, 'hex');
    const getEncTxt = Buffer.from(getEncrytedObj.encryptedData, 'base64');

    const getDecipher = crypto.createDecipheriv(getAlgorithm, Buffer.from(getEncKey, 'utf-8'), getIv);

    let getDecrypted = getDecipher.update(getEncTxt);
    getDecrypted = Buffer.concat([getDecrypted, getDecipher.final()]);

    return getDecrypted.toString();
};

module.exports = {
    getEncrytedData,
    getDecryptedData
}