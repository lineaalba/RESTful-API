/**
 * API version 1 routes.
 *
 * @author Filippa Jakobsson
 * @version 1.0.0
 */

const express = require('express')
const accountsRouter = require('./accountsRouter.js')
const catchesRouter = require('./catchesRouter.js')
const webHooksRouter = require('./webHooksRouter.js')
const { allLinks } = require('../../../lib/getMessage.js')
const router = express.Router()

// Get all HATEOAS links
router.get('/', allLinks)

// Use acocunts router
router.use('/accounts', accountsRouter, allLinks)

// Use fish catch router
router.use('/catches', catchesRouter, allLinks)

// Use webhooks router
router.use('/webhooks', webHooksRouter, allLinks)

// Exports
module.exports = router
