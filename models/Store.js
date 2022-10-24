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