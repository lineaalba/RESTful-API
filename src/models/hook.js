/**
 * Mongoose model Hook.
 *
 * @author Filippa Jakobsson
 * @version 1.0.0
 */

const mongoose = require('mongoose')

// Hook schema to be saved in database
const hookSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true
    },
    accountID: {
      type: String,
      required: [true, 'accountID is required.'],
    },
    url: {
      type: String,
      required: [true, 'URL is required.'],
      unique: true,
      trim: true
    }
    }, {
      timestamps: true,
      versionKey: false
  })

// Create a model using the schema
const Hook = mongoose.model('Hook', hookSchema)

// Exports
module.exports = Hook