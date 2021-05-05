const mongoose = require('mongoose')

const Log = mongoose.model(
    "Log",
    new mongoose.Schema({
        action: String,
        message: String,
        userId: Number,
        type: String,
        createdAt: { type: Date, default: Date.now }
    })
)

module.exports = Log;