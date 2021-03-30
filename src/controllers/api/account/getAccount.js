/**   
* Controller for get one account.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Account = require('../../../models/account.js')

/**
 * Finds account by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (!req.body.accountID) {
            res.status(400)
            req.message = 'Add account id as "accountID" in body as JSON'
            next()
        }
        // A logged in user should not be able to view other accounts
        if (req.body.accountID === req.payload.account_id) {
            const account = await Account.findOne({ _id: req.body.accountID })

            if (!account) {
                res.status(404)
                req.message = 'Account does not exist'
                next()
            }
         
            res.status(201)
            req.data = account
            next()

        } else {
            res.status(400)
            req.message = 'Access denied'
            next()
        }
    } catch (error) {
        next(error)
    }
}