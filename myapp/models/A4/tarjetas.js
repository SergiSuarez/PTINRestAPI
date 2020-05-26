var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var TarjetasSchema = new Schema({
    id_card: String,            //identificador de la tarjeta
    id_user: String,            //id_user del pasajero (DNI/pasaporte)
    aerolinea: String,          //aerolinea que lo emite
    millas: Number,             //millas acumuladas
    status: String,             //Status de la tarjeta (Gold/Silver....)
    caducidad: String           //Caducidad de la tarjeta
 },{collection:'tarjetas'});

module.exports = mongoose.model('tarjetas', TarjetasSchema);