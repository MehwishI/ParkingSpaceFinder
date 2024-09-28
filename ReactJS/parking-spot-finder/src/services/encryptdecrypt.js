import CryptoJS from "crypto-js";

const encDecKey = process.env.REACT_APP_ENCRYPTION_KEY;

const getEncryptedData = (getData) => {

    if (encDecKey.length !== 32) {
        throw new Error("Invalid key length")
    };

    const getIv = CryptoJS.lib.WordArray.random(16);

    const encData = CryptoJS.AES.encrypt(JSON.stringify(getData), CryptoJS.enc.Utf8.parse(encDecKey), {
        iv: getIv
    });

    return {
        iv: getIv.toString(CryptoJS.enc.Hex),
        encryptedData: encData.toString()
    };
};

const getDecryptedData = (getEncData) => {
    
    // const getIVRes = CryptoJS.enc.Base64.parse(getEncData.data.iv);
    // const getEncResData = getEncData.data.encrytedData;

    // // const getIVRes = CryptoJS.enc.Hex.parse(getEncData.data.iv);
    // // const getEncResData = getEncData.data.encrytedData;

    // console.log("fint",getIVRes);

    // const getDecBytes = CryptoJS.AES.decrypt(getEncResData, CryptoJS.enc.Utf8.parse(encDecKey), {
    //     iv: getIVRes
    // });

    // console.log("before final", getDecBytes);
    
    // const finalDecBytes = JSON.parse(getDecBytes.toString(CryptoJS.enc.Utf8));

    // console.log("final byte",finalDecBytes);
    

    // return finalDecBytes;

    const getParsedIV = CryptoJS.enc.Hex.parse(getEncData.data.iv);
    const getParsedEncData = CryptoJS.enc.Hex.parse(getEncData.data.encrytedData);

    const getParsedKey = CryptoJS.enc.Hex.parse(encDecKey);

    const getDecrypted = CryptoJS.AES.decrypt(
        {
            ciphertext: getParsedEncData
        },
        getParsedKey,
        {
            iv: getParsedIV
        }
    );

    const getDecryptText = getDecrypted.toString(CryptoJS.enc.Base64);

    // return JSON.parse(getDecryptText);
    return getDecryptText;
}

export {getEncryptedData, getDecryptedData};