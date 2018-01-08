var mongoose = require('mongoose');

module.exports = mongoose.model('states', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: Number,
    name: String
}),'states');