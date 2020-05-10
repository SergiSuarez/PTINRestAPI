var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ListaSchema = new Schema({
    id_pasajero: String, //identificador del coche
    vip: Boolean, //el pasajero es vip?
    disable: Boolean, //el pasajero es PMR?
    posicionx: Number, //posicion actual x
    posiciony: Number, //posicion actual y
    destinox: Number, //destivo coordenada x
    destinoy: Number, //destino coordenada y
 },{collection:'listaespera'});

module.exports = mongoose.model('listaespera', ListaSchema);