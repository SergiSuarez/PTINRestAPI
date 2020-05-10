var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var VuelosSchema = new Schema({
    id: String,
    origen: String,
    destino: String,
    fecha: String,
    hora: String,
    aerolinea: String,
    puerta: String,
    asientos_t: Number,
    asientos_a: Number,
    asientos: [{
        a1: String,
        a2: String,
        a3: String,
        a4: String,
        a5: String,
        a6: String,
        b1: String,
        b2: String,
        b3: String,
        b4: String,
        b5: String,
        b6: String
    }]
 },{collection:'vuelos'});

module.exports = mongoose.model('vuelos', VuelosSchema);