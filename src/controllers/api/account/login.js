/**   
* Login controller.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const Account = require('../../../models/account.js')

/**
 * Authenticates a user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400)
            req.message = 'Add email and password in body as JSON'
            next()
        }

        const account = await Account.authenticate(req.body.email, req.body.password)
        if (account === 'Error') {
            res.status(400)
            req.message = 'Wrong email and/or password'
            next()
        }
        const payload = {
            account_id: account._id,
            first_name: account.firstname,
            last_name: account.lastname,
            email: account.email
        }
  
        // Create the access token with the shorter lifespan
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        req.message = 'Successfully logged in!'
        req.data = account._id
        res
            .status(201)
            .header('auth-token', accessToken)

        next()

    } catch (error) {
        // If authentication fails
        const err = createError(401)
        err.innerException = errors
        next(err)
    }
}