/**   
* Controller for deleting an account.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Account = require('../../../models/account.js')

/**
 * Deletes account by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (req.body.id === undefined) {
            req.message = 'Add account id as "id" in body as JSON'
            next()
        }
        // Checks if logged in user is the same as the one that gets updated
        if (req.body.id === req.payload.account_id) {
            const deleteAccount = await Account.findOneAndDelete({
                _id: req.body.id
            })

            if (deleteAccount === null) {
                req.message = `No account with id {${req.body.id}} found`
                next()
            }
// 
            res.status(201)
            req.message = `Account with id {${deleteAccount._id}} successfully deleted!`
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

