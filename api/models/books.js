'use strict';

var mongoose = require('mongoose');

var booksSchema = new mongoose.Schema(
    {
        bookId: Number,
        bookCover: String,
        title: String,
        author: String,
        genre: Number,
        state: Number,
        userId: Number
    }, {versionKey: false }
);

var books = mongoose.model('books', booksSchema);
module.exports = books;