/**   
* Controller for deleting a catch.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Catch = require('../../../models/catch.js')
const webhookData = require('../../../lib/webhookData.js')

/**
 * Deletes catch by id.
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
            req.message = 'Add catch id as "id" and account id as "accountID" to body as JSON'
            next()
        }
            
        // Checks if logged in userID is the same as author author ID
        if (req.body.accountID === req.payload.account_id) {
            const deleteCatch = await Catch.findOneAndDelete(
                { _id: req.body.id,
                  accountID: req.body.accountID
                })

            // If catch id or account id is wrong    
            if (deleteCatch === null) {
                res.status(400)
                req.message = `No catch with id {${req.body.id}} and/or account with id {${req.body.accountID}} found`
                next()
            }
    
            res.status(201)
            req.message = 'Catch successfully deleted!'
            req.data = deleteCatch
            webhookData(deleteCatch)
            next()
        } else {
            res.status(400)
            res.message = 'Access Denied'
            next()
        }
    } catch (error) {
        next(error)
    }
}