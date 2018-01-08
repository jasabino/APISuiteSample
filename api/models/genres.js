'use strict';

var mongoose = require('mongoose');

var genresSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        code: Number,
        name: String
    }
);

var genres = mongoose.model('genres', genresSchema);
module.exports = genres;