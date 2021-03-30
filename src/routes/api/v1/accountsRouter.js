/**   
* Account router
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const express = require('express')
const router = express.Router()
const verify = require('../../../middlewares/verifyToken')
const login = require('../../../controllers/api/account/login')
const register = require('../../../controllers/api/account/register')
const getAccount = require('../../../controllers/api/account/getAccount')
const update = require('../../../controllers/api/account/update')
const deleteAccount = require('../../../controllers/api/account/deleteAccount')
const { allLinks } = require('../../../lib/getMessage.js')

// Login
router.post('/login', login, allLinks)

// Register new account
router.post('/', register, allLinks)
      
// Find account by id
router.get('/', verify, getAccount, allLinks)

// Update account by id
router.put('/', verify, update, allLinks)

// Delete account by id
router.delete('/', verify, deleteAccount, allLinks)

// Exports
module.exports = router