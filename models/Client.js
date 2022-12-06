const { Schema, model } = require('mongoose');

const ClientSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean, 
        required: true,
        default: true,
    },
});

module.exports = model('Client', ClientSchema);