/**   
* Controller for adding a catch.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Catch = require('../../../models/catch.js')
const webhookData = require('../../../lib/webhookData.js')

/**
 * Saves catch to database.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.accountID || !req.body.specie 
            || !req.body.weightKG || !req.body.lengthCM
            || !req.body.city || !req.body.lake
            || !req.body.location || !req.body.dateYYMMDD
            || !req.body.imageURL) {
                res.status(400)
                req.message = 'Add email, accountID, specie, weightKG, lengthCM, city, lake, location, dateYYMMDD and imageURL in body as JSON'
                next()
            }
        // Checks that logged in account id and email matches the added fields
        if (req.body.accountID === req.payload.account_id && req.body.email === req.payload.email) {    
            const newCatch = new Catch({
                email: req.body.email,
                accountID: req.payload.account_id,
                specie: req.body.specie,
                weightKG: req.body.weightKG,
                lengthCM: req.body.lengthCM,
                city: req.body.city,
                lake: req.body.lake,
                location: req.body.location,
                dateYYMMDD: req.body.dateYYMMDD,
                imageURL: req.body.imageURL
            })
  
            await newCatch.save()
            webhookData(newCatch)

            res.status(201)
            req.data = newCatch
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