var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TcConfigSchema = new Schema({
    name: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('tcconfig', TcConfigSchema)