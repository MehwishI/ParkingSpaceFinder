const { getCreateText, getCreateSpeech } = require('../services/aiService');
const { getEncrytedData, getDecryptedData } = require('../services/encryptService');

const getGeneratedText = async (req, res) => {
    const { currentLocAddress, currentCoordinates, destLocAddress, destCoordinates } = req.body;

    try {
        const fetchText = await getCreateText({
            currentLocAddress,
            currentCoordinates,
            destLocAddress,
            destCoordinates
        });
        
        res.status(200).json({
            generatedText: fetchText
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error generating text response',
            details: error.message
        });
    }
};

const getGeneratedVoice = async (req, res) => {
    
    console.log('body...',req);
    // start decrypting data
    const decryptData = getDecryptedData(req.body);
    
    const decryptDataObj =JSON.parse(decryptData);

    try {
        const { currentLocAddress, currentCoordinates, destLocAddress, destCoordinates } = decryptDataObj;
        const fetchText = await getCreateText({
            currentLocAddress,
            currentCoordinates,
            destLocAddress,
            destCoordinates
        });
        
        const fetchVoice = await getCreateSpeech(fetchText);

        // encrypt response
        // const encryptResData = getEncrytedData(fetchVoice);
        // console.log("encrypted res", encryptResData);

        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Disposition', 'inline; filename="audio.mp3"');

        // console.log("before buffer", encryptResData);
        
        // const setAudioBuffer = Buffer.from(encryptResData, 'base64');
        // console.log("after buffer",setAudioBuffer);
        
        // res.send(setAudioBuffer);
        res.send(fetchVoice);
        // res.send(encryptResData);

    } catch (error) {
        res.status(500).json({
            error: 'Error generating voice response',
            details: error.message
        });
    }
};

module.exports = {
    getGeneratedText,
    getGeneratedVoice
};
