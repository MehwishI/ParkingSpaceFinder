// start openai import
const { OpenAI } = require("openai");
const fs = require('fs');
const path = require('path');

const getOpenai = new OpenAI({
   apiKey: process.env.API_KEY_OPENAI,
});

const speechFile = path.join(__dirname, 'speech.mp3');

// Text to Text API
const getCreateText = async (reqText) => {
    try {
        const resp = await getOpenai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a parking recommendation assistant. You will analyze parking data based on coordinates and addresses provided by the user.',
                },
                {
                    role: 'user',
                    content: `Given the following details, suggest the best parking options and provide nearby alternatives if available:
          - Destination Coordinates: ${reqText.destCoordinates}
          - Current Coordination: ${reqText.currentCoordinates}
          - User's Current Location: ${reqText.currentLocAddress}
          - User's Destination: ${reqText.destLocAddress}
    
          Based on the information provided, recommend the most optimal parking spot and suggest alternatives if the initial one is less ideal. Suggest if the parking area is safe. If there is street parking nearby. Provide any additional suggestions regarding nearby amenities, traffic conditions based on past knowledge, or relevant insights to help the user make an informed decision.
          Please don't include anything like "Based on the information provided" in your response. Also, don't recommend any app.`,
                },
            ],
        });

        const aiRespAw = resp.choices[0].message.content;

        return aiRespAw;
    } catch (error) {
        console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
        throw new Error('Error getting AI response');
    }
};

const getCreateSpeech = async (genTextReq) => {
    try {
        
        const mp3 = await getOpenai.audio.speech.create({
            model: "tts-1",
            voice: "echo",
            input: genTextReq
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);

        return buffer;
    } catch (error) {
        console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
        throw new Error('Error getting AI response');
    }
};

module.exports = {
    getCreateText,
    getCreateSpeech
};