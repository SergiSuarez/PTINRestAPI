var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var NodoSchema = new Schema({
    nombre_nodo: String,    //identificador del nodo
    latitud: Number,        //latitud        
    longitud: Number,       //longitud
    nodos_vecinos: String   //lista de nodos vecinos
 },{collection:'nodos'});

module.exports = mongoose.model('nodos', NodoSchema);