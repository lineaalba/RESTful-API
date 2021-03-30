/**   
* The starting point of the application.
*
* @autor Filippa Jakobsson
* @version 1.0.0
*/

const express = require('express')
const logger = require('morgan')
const mongoose = require('./config/mongoose')
const helmet = require('helmet')
const router = require('./routes/router.js')

require('dotenv').config()

const port = process.env.PORT || 5000

// Express setup
const app = express()
app.use(helmet())

// Set up a morgan logger using the dev format for log entries
app.use(logger('dev'))

// Parse requests of the content type application/json
app.use(express.json())

// Connect to the database
mongoose.connect().catch(error => {
    console.error(error)
    process.exit(1)
})

// Register routes
app.use('/', router)

  // Error handler
app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      return
    }
    
    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})