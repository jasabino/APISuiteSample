'use strict';

var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        userId: Number,
        subscriptionId: Number
    }
);

var users = mongoose.model('users', usersSchema);
module.exports = users;