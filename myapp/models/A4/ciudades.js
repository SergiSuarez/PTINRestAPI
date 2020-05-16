var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var CiudadesSchema = new Schema({
    ciudad: String
 },{collection:'ciudades'});

module.exports = mongoose.model('ciudades', CiudadesSchema);