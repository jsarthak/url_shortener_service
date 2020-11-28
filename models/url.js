const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,

    },
    longUrl: {
        required: true,
        type: String
    },
    shortUrl: {
        type: String,
        required: true
    },
    visits: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('URL', urlSchema);