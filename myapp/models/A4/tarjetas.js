var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var TarjetasSchema = new Schema({
    id_card: String,
    id_user: String,
    aerolinea: String,
    millas: Number,
    status: String,
    caducidad: String
 },{collection:'tarjetas'});

module.exports = mongoose.model('tarjetas', TarjetasSchema);