const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
});

ProductSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Product', ProductSchema);