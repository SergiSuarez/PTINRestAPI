var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var VuelosSchema = new Schema({
    id: String,                 //id_del vuelo
    origen: String,             //Ciudad de origen
    destino: String,            //Ciudad de destino
    fecha: String,              //Fecha del vuelo
    hora: String,               //Hora del vuelo
    aerolinea: String,          //Aerolinea del vuelo
    puerta: String,             //Puerta de embarque
    asientos_t: Number,         //Asientos totales del vuelo
    asientos_a: Number,         //Asientos disponibles del vuelo
    asientos: [{                //Asignación de asientos
        a1: String,             //username del pasajero que lo ocupa si está asignado
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