/**
 * The routes.
 *
 * @author Filippa Jakobsson
 * @version 1.0.0
 */

const express = require('express')
const createError = require('http-errors')
const routerV1 = require('./api/v1/router.js')

const router = express.Router()

// The current version to use
router.use('/', routerV1)

// Catch 404
router.use('*', (req, res, next) => next(createError(404)))

// Exports
module.exports = router