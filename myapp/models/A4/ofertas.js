var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var OfertasSchema = new Schema({
    id_shop: String,        //_id del negocio
    descripcion: String,    //descripción de la oferta
    caducidad: String,      //caducidad de la oferta
    intereses: [String],    //array de intereses para que haya match con pasajeros
    publico: [String]       //público al que va dirigido (vips, disableds, todos, ....)
 },{collection:'ofertas'});

module.exports = mongoose.model('ofertas', OfertasSchema);