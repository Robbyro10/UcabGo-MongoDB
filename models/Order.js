const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    location: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true,
        trim: true,
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
        trim: true,
    },
    status: {
        type: String,
    },
    quantity: {
        type: String,
    },
    notes: {
        type: String,
        trim: true,
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

OrderSchema.pre("save", function (next){
    this.notes = this.notes.charAt(0).toUpperCase() + this.notes.slice(1);
    this.detail = this.detail.charAt(0).toUpperCase() + this.detail.slice(1);
    next();
})

OrderSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Order', OrderSchema);