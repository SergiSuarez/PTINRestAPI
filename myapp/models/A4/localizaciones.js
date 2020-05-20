var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var NodoSchema = new Schema({
    nombre_nodo: String, //identificador del noso
    coordenadas: String,
    nodos_vecinos: String
 },{collection:'nodos'});

module.exports = mongoose.model('nodos', NodoSchema);