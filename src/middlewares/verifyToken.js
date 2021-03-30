/**   
* Middleware helper to verify user with JWT.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const jwt = require('jsonwebtoken')

/**
 * Authenticate user with JWT.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = function (req, res, next) {
    const token = req.header('auth-token')

    if (!token) {
        res.status(401).json('Access denied')
    } 

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.account = verified
        req.payload = parse(token)
        next()
    } catch(error) {
        res.status(400).json('Invalid Token')
    }
}

/**
 * Parses access token.
 *
 * @param {String} token - The access token to parse.
 */
const parse = (token) => {
    const base64URL = token.split('.')[1]
    const base64 = base64URL.replace('-', '+').replace('_', '/')
    const bufferObj = Buffer.from(base64, 'base64')
    const decoded = bufferObj.toString('utf8')
    const parsed = JSON.parse(decoded)

    return parsed
}
