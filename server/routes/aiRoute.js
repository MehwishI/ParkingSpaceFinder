const express = require('express');
const router = express.Router();
const { getGeneratedVoice } = require('../controllers/aiController');

/**
 * @swagger
 * /api/generate-ai-voice:
 *   post:
 *     summary: Returns an AI voice generated response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Hello, generate a voice response."
 *     responses:
 *       200:
 *         description: A successful response with generated audio
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error generating voice
 */

router.post('/generate-ai-voice', getGeneratedVoice);

module.exports = router;