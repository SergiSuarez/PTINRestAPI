var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var NegociosSchema = new Schema({
    nombre: String,
    tipo: String,
    local: String,
    descripcion: String,
    intereses: [String],
    estado: String,
    logo: String,
    foto: String,
    valoracion: [{
        id_user: String,
        fecha: String,
        valor: Number
    }]
 },{collection:'negocios'});

module.exports = mongoose.model('negocios', NegociosSchema);