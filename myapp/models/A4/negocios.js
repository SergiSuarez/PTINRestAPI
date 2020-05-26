var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var NegociosSchema = new Schema({
    nombre: String,             //nombre del negocio
    tipo: String,               //tipo del negocio
    local: String,              //local en nodo
    descripcion: String,        //descripción del negocio
    intereses: [String],        //Array de intereses
    estado: String,             //Abierto - Cerrado
    logo: String,               //ruta del logo del negocio
    foto: String,               //ruta de la foto del negocio
    valoracion: [{              //Array de valoraciones se guarda id_user y fecha 
        id_user: String,        //para impedir que un pasajero valore varias veces en un día
        fecha: String,
        valor: Number
    }]
 },{collection:'negocios'});

module.exports = mongoose.model('negocios', NegociosSchema);