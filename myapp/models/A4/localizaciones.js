var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var NodoSchema = new Schema({
    nodo: String, //identificador del noso
    coordenadas: String,
    nodo: String,
    vecinos: String
 },{collection:'nodos'});

module.exports = mongoose.model('nodos', NodoSchema);