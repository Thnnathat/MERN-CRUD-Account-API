const { expressjwt } = require('express-jwt')

function authJwt() {
    const secret = process.env.SECRET_KEY
    const api = process.env.API_URL
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users`,
        ]
    })
}

async function isRevoked(req, token) {
    return !token.payload.isAdmin
}

module.exports = authJwt