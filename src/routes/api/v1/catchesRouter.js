/**   
* Catch router.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const express = require('express')
const verify = require('../../../middlewares/verifyToken')
const router = express.Router()
const addCatch = require('../../../controllers/api/catch/addCatch')
const deleteCatch = require('../../../controllers/api/catch/deleteCatch')
const getCatch = require('../../../controllers/api/catch/getCatch')
const updateCatch = require('../../../controllers/api/catch/updateCatch')
const { allLinks } = require('../../../lib/getMessage.js')

// Get specific catch by id or all
router.get('/', verify, getCatch, allLinks)

// Add catch
router.post('/', verify, addCatch, allLinks)

// Update catch by id
router.put('/', verify, updateCatch, allLinks)

// Delete catch by id
router.delete('/', verify, deleteCatch, allLinks)

// Exports
module.exports = router