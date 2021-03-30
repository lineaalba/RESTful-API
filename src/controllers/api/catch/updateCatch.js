/**   
* Controller for updating one catch.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Catch = require('../../../models/catch.js')
const webhookData = require('../../../lib/webhookData.js')

/**
 * Updates catch by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        if (!req.body.id || !req.body.email || !req.body.accountID || !req.body.specie 
            || !req.body.weightKG || !req.body.lengthCM
            || !req.body.city || !req.body.lake
            || !req.body.location || !req.body.dateYYMMDD
            || !req.body.imageURL) {
                res.status(400)
                req.message = 'Add catch id as "id", email and updated specie, weightKG, lengthCM, city, lake, location, dateYYMMDD and imageURL in body as JSON'
                next()
            }

        // Checks that logged in account id and email matches the updated fields
        if (req.body.accountID === req.payload.account_id && req.body.email === req.payload.email) {
            // TODO: add default values
            const fishCatch = await Catch.findByIdAndUpdate(
                { _id: req.body.id },
                { email: req.body.email,
                  accountID: req.body.accountID,
                  specie: req.body.specie,
                  weightKG: req.body.weightKG,
                  lengthCM: req.body.lengthCM,
                  city: req.body.city,
                  lake: req.body.lake,
                  location: req.body.location,
                  dateYYMMDD: req.body.dateYYMMDD,
                  imageURL: req.body.imageURL 
                },{ new: true })

                if (fishCatch === null) {
                    res.status(400)
                    req.message = 'Catch id does not exist'
                    next()
                }

                res.status(201)
                req.message = 'Catch successfully updated!'
                req.data = fishCatch
                webhookData(fishCatch)
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