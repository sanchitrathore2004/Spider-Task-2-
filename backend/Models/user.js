const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    saved: [{
        type: mongoose.Types.ObjectId,
        ref: "bookModel",
    }],
    savedApi: [{
        type: String,
    }],
    profilePhoto: {
        type: Buffer,
        required: false,
    },
    purchases: [{
        type: mongoose.Types.ObjectId,
        ref: 'bookModel',
    }],
    purchasesApi: [{
        type: String,
    }],
});

const userModel = mongoose.model('User', User);

module.exports = userModel;