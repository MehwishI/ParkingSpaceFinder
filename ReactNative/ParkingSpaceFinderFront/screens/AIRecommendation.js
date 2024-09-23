/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a Hello message
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from the backend!
 */

// start openai import
const { OpenAI } = require("openai");
const fs = require('fs');
const path = require('path');
// import axios from 'axios';

// const getConfiguration = new Configuration({
//   apiKey: process.env.API_KEY_OPENAI,
// });

const getOpenai = new OpenAI({
  apiKey: process.env.API_KEY_OPENAI,
});

const userPresentLocation = "340 Provencher Blvd, Winnipeg, MB R2H 0G7";
const userCurrentCoordinate = "Lat: 49.89418822548855, Long: -97.11417756985763";
const userDestination = "433 St Mary's Rd, Winnipeg, MB R2M 3K7";
const userDestCoordinate = "Lat: 49.87167903906522, Long: -97.11233221002861";

const speechFile = path.join(__dirname, 'speech.mp3');

// Text to Text API
const getTestApi = async () => {
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
          - Destination Coordinates: ${userDestCoordinate}
          - Current Coordination: ${userCurrentCoordinate}
          - User's Current Location: ${userPresentLocation}
          - User's Destination: ${userDestination}
    
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

const getTestCreateSpeech = async () => {
  try {
    const aiRespResult = await getTestApi();
    // const speechRespMp3 = await getOpenai.audio.speech.create(
    //   model = "tts-1",
    //   voices = "aloy",
    //   input = "Name three places in England"
    // );

    // // return response.stream_to_file("outputtest.mp3");
    // const buffer = Buffer.from(await speechRespMp3.arrayBuffer());
    // await fs.promises.writeFile(speechFile, buffer);
    const mp3 = await getOpenai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: aiRespResult
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
  getTestApi,
  getTestCreateSpeech
};