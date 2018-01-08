'use strict';

var mongoose = require('mongoose');

var tokensSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        userId: Number,
        token: String
    }
);

var tokens = mongoose.model('tokens', tokensSchema);
module.exports = tokens;