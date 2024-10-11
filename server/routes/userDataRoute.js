//routes
const express = require("express");
const router = express.Router();
const {
  fetchUserData,
  saveUserData,
} = require("../controllers/userDataController");

/**
 *@swagger
 * /api/user/profile:
 *   post:
 *     tags:
 *       - User Profile
 *     summary: Returns user profile data from DB.
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
 *                   example: User Profile Data!
 */

/**
 *@swagger
 * /api/user/profile/save:
 *   post:
 *     tags:
 *       - User Profile
 *     summary: Saves the user data into Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 example: "Add user id"
 *               firstname:
 *                 type: text
 *                 example: "Add first name"
 *               lastname:
 *                 type: text
 *                 example: "Add last name"
 *               email:
 *                  type: string
 *                  format: email
 *                  example: "Add user email here"
 *
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
 *                   example: "User data saved successfully"
 */

router.post("/user/profile", fetchUserData);
router.post("/user/profile/save", saveUserData);

module.exports = router;
