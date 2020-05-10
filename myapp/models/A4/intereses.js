var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var InteresesSchema = new Schema({
    interes: String, //identificador del coche
 },{collection:'intereses'});

module.exports = mongoose.model('intereses', InteresesSchema);