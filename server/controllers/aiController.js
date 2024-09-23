const { getCreateText, getCreateSpeech } = require('../services/aiService');

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
    try {
        const { currentLocAddress, currentCoordinates, destLocAddress, destCoordinates } = req.body;
        const fetchText = await getCreateText({
            currentLocAddress,
            currentCoordinates,
            destLocAddress,
            destCoordinates
        });
        
        const fetchVoice = await getCreateSpeech(fetchText);

        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Disposition', 'inline; filename="audio.mp3"');
        res.send(fetchVoice);

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
