/**   
* Controller for getting specific catch.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const Catch = require('../../../models/catch.js')

/**
 * Gets a specific catch by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {  
    try {
        if (req.body.id) {
            // Get specific catch
            const fishCatch = await Catch.findOne({
                _id: req.body.id
            })
        
            if (fishCatch === null) {
                res.status(404)
                req.message = `No catch with id ${req.body.id} found`
                next()
                return
            }
        
            res.status(201)
            req.data = fishCatch
            next()
        } else {
            // Get all catches in database
            const database = {
                catches: (await Catch.find({}))
                .map(fish => ({
                    id: fish._id,
                    email: fish.email,
                    accountID: fish.accountID,
                    specie: fish.specie,
                    weightKG: fish.weightKG,
                    lengthCM: fish.lengthCM,
                    city: fish.city,
                    lake: fish.lake,
                    location: fish.location,
                    dateYYMMDD: fish.dateYYMMDD,
                    imageURL: fish.imageURL
                }))
            }
        
            
            if (database.catches.length === 0) {
                res.status(404)
                req.message = 'No catches in database'
                next()
            }

            res.status(201)
            req.data = database.catches
            next()
        }
    } catch (error) {
        next(error)
    }
}
