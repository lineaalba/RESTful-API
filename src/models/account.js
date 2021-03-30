/**
 * Mongoose model Account.
 *
 * @author Filippa Jakobsson
 * @version 1.0.0
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const { isEmail } = validator

// Account schema to be saved in database
const accountSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required.'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, '{VALUE} is not an valid email address.']
  },
  password: {
    type: String,
    minlength: [5, 'Password must be of minimum length 5 characters.'],
    required: [true, 'Password is required.']
  }
  }, {
    timestamps: true,
})

accountSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

accountSchema.statics.authenticate = async function (email, password) {
  let account = await this.findOne({ email })
  
  // If no account is found or the password is wrong, throw an error
  if (!account || !(await bcrypt.compare(password, account.password))) {
    account = 'Error'
  }

  return account
}

// Create a model using the schema
const Account = mongoose.model('Account', accountSchema)

// Exports
module.exports = Account