var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, required: true, trim: true },
    resolution: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('group', GroupSchema)