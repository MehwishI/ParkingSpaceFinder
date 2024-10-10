//routes
const express = require("express");
const router = express.Router();
const {
  fetchUserParkingData,
  saveUserParkingData,
} = require("../controllers/userParkingController");

/**
 *@swagger
 * /api/user/parking:
 *   post:
 *     tags:
 *       - User Parking
 *     summary: Returns user parking history from DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 example: "type userid here"
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
 *                   example: User Parking Data!
 */

/**
 *@swagger
 * /api/user/parking/save:
 *   post:
 *     tags:
 *       - User Parking
 *     summary: Saves the user parking data into Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                  type: string
 *                  example: "Add userid here"
 *               email:
 *                  type: string
 *                  format: email
 *                  example: "Add user email here"
 *               latitude:
 *                  type: number
 *                  example: "Add latitude here"
 *               longitude:
 *                  type: number
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
 *                   example: "User parking data saved successfully"
 */

router.post("/user/parking", fetchUserParkingData);
router.post("/user/parking/save", saveUserParkingData);
module.exports = router;
