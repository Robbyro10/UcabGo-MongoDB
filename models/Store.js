const { Schema, model } = require('mongoose');

const StoreSchema = Schema({
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
    rif: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean, 
        required: true,
        default: true,
    },
});

module.exports = model('Store', StoreSchema);