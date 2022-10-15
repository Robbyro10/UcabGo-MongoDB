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
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    rif: {
        type: String,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

module.exports = model('Store', StoreSchema);