var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var OfertasSchema = new Schema({
    id_shop: String,
    descripcion: String,
    caducidad: String,
    intereses: [String],
    publico: [String]
 },{collection:'ofertas'});

module.exports = mongoose.model('ofertas', OfertasSchema);