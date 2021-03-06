var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ThinClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    mac: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    settings: {
        type: String,
        trim: true,
        default: "1280"
    },
    lastseen: {
        type: String,
        trim: true,
        default: "never"
    },
    lastknownip: {
        type: String,
        trim: true,
        default: "none"
    },
    wsversion: {
        type: String,
        trim: true,
        default: "unknown"
    }
});

module.exports = mongoose.model('thinclient', ThinClientSchema)
