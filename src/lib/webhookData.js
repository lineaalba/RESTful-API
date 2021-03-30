/**   
* Middleware sending webhook data.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Hooks = require('../models/hook.js')
const fetch = require('node-fetch')

/**
 * Send webhook data.
 *
 * @param {Object} body - The body to send.
 * @param {Function} next - Express next middleware function.
 */
const webhookData = async (body, next) => {
    try {
        const hook = await Hooks.findOne({})
        fetch(hook.url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            })
    } catch (error) {
        next(error)
    }
}

// Exports
module.exports = webhookData
