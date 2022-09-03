const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsSchema = new Schema({

    name: {
        type: String
    },
    brand: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: Object
    }
}, {
    collection: 'products',
    // timestamps: true
})

module.exports = mongoose.model('Products', productsSchema)