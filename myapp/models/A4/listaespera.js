var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ListaSchema = new Schema({
    id_pasajero: String,    //identificador del coche
    vip: Boolean,           //el pasajero es vip?
    disable: Boolean,       //el pasajero es PMR?
    nodoactual: String,     //posicion actual
    nododestino: String     //posicion del destino
 },{collection:'listaespera'});

module.exports = mongoose.model('listaespera', ListaSchema);