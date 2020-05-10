var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var PosPasajeroSchema = new Schema({
    id_pasajero: String, //identificador del coche
    posicionx: Number, //posicion actual x
    posiciony: Number, //posicion actual y
 },{collection:'pospasajero'});

module.exports = mongoose.model('pospasajero', PosPasajeroSchema);