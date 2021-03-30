/**   
* Update account controller.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Account = require('../../../models/account.js')

/**
 * Updates account by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (req.body.id === undefined || req.body.firstname === undefined 
        || req.body.lastname === undefined || req.body.email === undefined) {
            res.status(400)
            req.message = 'Add account id as "id" and updated firstname, lastname and email in body as JSON'
            next()
        }
        // Checks if logged in user is the same as the one that gets updated
        if (req.body.id === req.payload.account_id) {
            // TODO: add default values 
            // TODO: if id is wrong, send status(400)
            const account = await Account.findByIdAndUpdate(
                { _id: req.body.id },
                { firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email, 
                },{ new: true })
          
            res.status(201)
            req.message = 'Account successfully updated!'
            req.data = account
            next()
    
        } else {
            res.status(400)
            req.message = 'Access Denied'
            next()
        }
    } catch (error) {
        next(error)
    }
}
