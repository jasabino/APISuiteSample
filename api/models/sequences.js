'use strict';

var mongoose = require('mongoose');

var sequencesSchema = new mongoose.Schema(
    {
        _id:  String,
        sequence_value: Number
    }
);

var sequences = mongoose.model('sequences',sequencesSchema);
module.exports = sequences;