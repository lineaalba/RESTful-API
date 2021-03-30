/**
 * Mongoose model Catch.
 *
 * @author Filippa Jakobsson
 * @version 1.0.0
 */

const mongoose = require('mongoose')

// Catch schema to be saved in database
const catchSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    accountID: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    weightKG: {
        type: Number,
        required: true
    },
    lengthCM: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    lake: {
        type: String,
        required: true
    },
    location: {
        type: [Number],
        required: true
    },
    dateYYMMDD: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true
    }
})

// Create a model using the schema
const Catch = mongoose.model('Catch', catchSchema)

// Exports
module.exports = Catch