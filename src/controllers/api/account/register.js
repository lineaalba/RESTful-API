/**   
* Register account controller.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Account = require('../../../models/account.js')

/**
 * Saves account to database.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {

        const inDatabase = await Account.findOne({ email: req.body.email })
        if (inDatabase) {
          res.status(400)
          req.message = 'Register failed. Email already taken'
          next()
          return
        }

        const user = new Account({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
          })

        // If some data is missing
        if (!user.firstname || !user.lastname || !user.email || !user.password) {
            res.status(400)
            req.message = 'Register failed. Add firstname, lastname, email and password in body as JSON'
            next()
        }
        await user.save()

        res.status(201)
        req.message = 'Account successfully created!'
        req.data = user.id
        next()

    } catch(error) {
        if (error.code === 11000) {
            res.status(400)
            req.message = 'Register failed. Email already taken'
            next()
        }
        next(error)
    }
}