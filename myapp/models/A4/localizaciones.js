var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var InteresesSchema = new Schema({
    nodo: String, //identificador del noso
    latitud: Number,
    longitud: Number
 },{collection:'intereses'});

module.exports = mongoose.model('intereses', InteresesSchema);