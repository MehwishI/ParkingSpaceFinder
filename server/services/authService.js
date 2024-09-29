
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const getCheckJwt = () => jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    audience: process.env.AUTH0_AUD,
    issuer:`https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

module.exports = {
    getCheckJwt
}