const express = require("express");
const router = express.Router();

const { getWpaPaystation } = require('../api/wpapaystation');
/**
 *@swagger
 * /api/wpapaystation:
 *   get:
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

router.get("/wpapaystation", getWpaPaystation);
//router.get("api/")

module.exports = router;