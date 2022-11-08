const { Schema, model } = require('mongoose');

const OrderProductSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    detail: {
        type: String,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

OrderProductSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('OrderProduct', OrderProductSchema);