const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    location: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    payment: {
        type: String, 
        required: true
    },
    time: {
        type: String,
    },
    day: {
        type: String,
    },
    appearance: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

OrderSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Order', OrderSchema);