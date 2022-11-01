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
    img: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = model('Client', ClientSchema);