const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let registerSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'register'
})

module.exports = mongoose.model('Register', registerSchema)