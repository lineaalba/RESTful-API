/**   
* Controller for finding a specific webhook.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Hook = require('../../../models/hook.js')

/**
 * Gets a specific webhook by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (!req.body.id) {
            res.status(400)
            req.message = 'Add hook id as "id" in body as JSON'
            next()
        }
        // Get specific webhook
        // TODO: if webhook id not exists, send status 404
        const webhook = await Hook.findOne({ _id: req.body.id })

        if (!webhook) {
            res.status(404)
            req.message = 'Webhook does not exist'
            next()
        }

        // A logged in user should not be able to view other user's webhooks
        if (webhook.accountID === req.payload.account_id) {
            res.status(201)
            req.data = webhook
            next()
            
        } else {
            res.status(400)
            req.message = 'Access Denied'
            next()
        }
    } catch(error) {
        next(error)
    }
}