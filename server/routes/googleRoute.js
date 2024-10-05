const express = require("express");
const router = express.Router();

const {
  fetchAutocompleteGgl,
  fetchCoordinatesbyPlaceId,
} = require("../controllers/googleApiController");

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

/**
 *@swagger
 * /api/googlecoordinates:
 *   post:
 *     tags:
 *       - Google Api
 *     summary: Returns coordinates from google api.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placeid:
 *                 type: text
 *                 example: "Add Place ID"
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
 *                   example: google coordinates data!
 */
router.post("/googleautocomplete", fetchAutocompleteGgl);
router.post("/googlecoordinates", fetchCoordinatesbyPlaceId);

module.exports = router;
