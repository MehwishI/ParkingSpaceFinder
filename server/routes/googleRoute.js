const express = require("express");
const router = express.Router();

const { fetchAutocompleteGgl} = require('../controllers/googleApiController');

/**
 *@swagger
 * /api/googleautocomplete:
 *   post:
 *     tags:
 *       - Google Api
 *     summary: Returns google autocomplete from google api.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: text
 *                 example: "Add text"
 *
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
 *                   example: google autocomplete data!
 */
router.post("/googleautocomplete", fetchAutocompleteGgl);

module.exports = router;