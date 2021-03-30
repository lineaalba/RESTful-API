/**   
* Hooks router.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const express = require('express')
const router = express.Router()
const verify = require('../../../middlewares/verifyToken')
const addHook = require('../../../controllers/api/webhook/addHook')
const deleteHook = require('../../../controllers/api/webhook/deleteHook')
const getHook = require('../../../controllers/api/webhook/getHook')
const { allLinks } = require('../../../lib/getMessage.js')

// Add webhook
router.post('/', verify, addHook, allLinks)

// Get a specific webhook by webhook id
router.get('/', verify, getHook, allLinks)

// Delete specific webhook
router.delete('/', verify, deleteHook, allLinks)

// Exports
module.exports = router