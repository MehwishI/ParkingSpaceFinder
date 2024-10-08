
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

// const getCheckJwt = () => jwt({
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }),

//     audience: process.env.AUTH0_AUD,
//     issuer:`https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ['RS256']
// });

const getClient = jwksRsa({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
    getClient.getSigningKey(header.kid, (err, key) => {
        if (err) {
         callback(err, null);   
        } else {
            const signingKey = key.getPublicKey();
            callback(null, signingKey);
        }
    });
}

const getVerifyToken = (token) => {
    const getOptions = {
        audience: process.env.AUTH0_CLIENT_ID,
        issuer: process.env.AUTH0_DOMAIN,
        algorithms: ['RS256']
    };

    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, getOptions, (err, decoded) => {
            if (err) {
                reject('Invalid token');
            } else {
                resolve(decoded);
            }
        });
    });
};

const getUserId = (decodedToken) => {
    return decodedToken.sub
}

module.exports = {
    getVerifyToken,
    getUserId
}