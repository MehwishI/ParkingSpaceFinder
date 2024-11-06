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
                    content: 'You are a parking recommendation assistant. You will analyze parking data based on coordinates and address provided by the user.',
                },
                {
                    role: 'user',
                    content: `Given the following details, suggest the best parking options and provide nearby alternatives if available:
          - Coordinates: ${reqText.destCoordinates}
          - Address: ${reqText.destLocAddress}
    
          Based on the information provided, recommend the most optimal parking spot and suggest alternatives if the initial one is less ideal. Suggest if the parking area is safe. If there is street parking nearby. Provide any additional suggestions regarding nearby amenities, traffic conditions based on past knowledge, or relevant insights to help the user make an informed decision.
          Please don't include anything like "Based on the information provided" in your response. Also, don't recommend any app.
          
          Additionally, please provide the recommended parking spots with the structure below just after the detailed sugestion you have already provided for the request above (separate this from the detailed suggestion with a space. Do not include any headers or titles. Do not include any additional formatting or surrounding code block markers). The format should look like the following:
           
          aiSugJsonStruct {
                "parking": [
                    {
                        "name": "Parking Lot A",
                        "coordinates": {"lat": 37.7749, "lng": -122.4194}
                    },
                    {
                        "name": "Parking Lot B",
                        "coordinates": {"lat": 37.7813, "lng": -122.3917}
                    }
                ]
            }
          `,
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

        const splitSugText = genTextReq.split("aiSugJsonStruct");
        
        const mp3 = await getOpenai.audio.speech.create({
            model: "tts-1",
            voice: "echo",
            input: splitSugText[0]
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        // await fs.promises.writeFile(speechFile, buffer);

        // return buffer;
        return {
            text: splitSugText[0],
            textJson: splitSugText[1],
            buffer: buffer
        };
    } catch (error) {
        console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
        throw new Error('Error getting AI response');
    }
};

module.exports = {
    getCreateText,
    getCreateSpeech
};