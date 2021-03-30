/**   
* Controller for adding a webhook.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Hook = require('../../../models/hook.js')

/**
 * Saves webhook to database.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.accountID || !req.body.url) {
            res.status(400)
            req.message = 'Add email, accountID, and url in body as JSON'
            next()
        }
 
        if (req.body.accountID === req.payload.account_id && req.body.email === req.payload.email) {    
            const hook = new Hook({
                email: req.body.email,
                accountID: req.body.accountID,
                url: req.body.url
            })

            await hook.save()

            res.status(201)
            req.message = 'Webhook successfully added!'
            req.data = hook
            next()
        } else {
            res.status(400)
            req.message = 'Access Denied'
            next()
        }

    } catch(error) {
        if (error.code === 11000) {
            res.status(400)
            req.message = 'Register failed. Url already added'
            next()
        }
        next(error)
    }
}