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

module.exports = (req, res) => {
  res.status(200).json({ message: "Hello from the backend!" });
};