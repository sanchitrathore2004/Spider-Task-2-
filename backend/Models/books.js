const mongoose = require('mongoose');
const userModel = require('../Models/user');

const Book = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
    },
});

const bookModel = mongoose.model('bookModel', Book);

module.exports = bookModel;