const express = require("express");
const router = express.Router();

const {
  fetchWpaApiData,
  fetchWpaApiStreet,
  fetchWpaApiTimeLimit,
  fetchWpaApiLocation,
} = require("../controllers/wpaController");

/**
 *@swagger
 * /api/wpapaystation:
 *   get:
 *     tags:
 *       - WPA Parking Data
 *     summary: Returns  wpaPaystation data for on-street parking and parking lots in ciy of Winnipeg.
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
 *                   example: wpaPaystation data!
 */

/**
 *@swagger
 * /api/wpastreet:
 *   post:
 *     tags:
 *       - WPA Parking Data
 *     summary: Returns wpaPaystation data for on-street parking and parking lots in ciy of Winnipeg.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "Add text here."
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
 *                   example: wpaPaystation data!
 */

/**
 *@swagger
 * /api/wpatimelimit:
 *   post:
 *     tags:
 *       - WPA Parking Data
 *     summary: Returns wpaPaystation data for on-street parking and parking lots in ciy of Winnipeg by time limit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time_limit:
 *                 type: number (hours)
 *                 example: "Add text here.(hours)"
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
 *                   example: wpaPaystation data  by time limit!
 */
/**
 *@swagger
 * /api/wpalocation:
 *   post:
 *     tags:
 *       - WPA Parking Data
 *     summary: Returns wpaPaystation data for on-street parking and parking lots in ciy of Winnipeg by location coordinates.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: double
 *                 example: "Add latitude here."
 *               longitude:
 *                  type: double
 *                  example: "Add longitude here"
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
 *                   example: wpaPaystation data!
 */
router.get("/wpapaystation", fetchWpaApiData);
router.post("/wpastreet", fetchWpaApiStreet);
router.post("/wpatimelimit", fetchWpaApiTimeLimit);
router.post("/wpalocation", fetchWpaApiLocation);

module.exports = router;
