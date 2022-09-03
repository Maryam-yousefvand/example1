const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loginSchema = new Schema({

    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'login'
})

module.exports = mongoose.model('Login', loginSchema)