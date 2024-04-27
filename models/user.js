const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    }
    ,
    image: {
        type: String
    },
    images: [{
        type: String
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User