/**   
* Controller for deleting a webhook.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Hook = require('../../../models/hook.js')

/**
 * Deletes a specific webhook.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
          // If catch id or account id is missing
          if (!req.body.id || !req.body.accountID) {
            res.status(400)
            req.message = 'Add webhook id as "id" and account id as "accountID" to body as JSON'
            next()
        }
        // Checks if logged in user is the same as the one that gets updated
        if (req.body.accountID === req.payload.account_id) {
        const deleteHook = await Hook.findOneAndDelete({ _id: req.body.id })

        res.status(201)
        req.message = 'Webhook successfully deleted!'
        req.data = deleteHook
        next()

    } else {
        res.status(400)
        req.message = 'Access Denied'
        next()
    }

    } catch (error) {
        next(error)
    }
    // try {
    //     const hook = new Hook({
    //        email: req.body.email,
    //        url: req.body.url,
    //        key: 'fish'
    //       })
  
    //     await hook.save()

    //     res.status(201)
    //     req._id = hook.id
    //     req.email = hook.email
    //     req.url = hook.url
        
    //     next()

    // } catch(error) {
    //     next(error)
    // }
}