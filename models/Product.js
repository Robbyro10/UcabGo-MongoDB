const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    desc: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
    },
    active: {
        type: Boolean, 
        required: true,
        default: true,
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
});

ProductSchema.pre("save", function (next){
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    next();
})

ProductSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Product', ProductSchema);