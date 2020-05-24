var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var PosPasajeroSchema = new Schema({
    id_pasajero: String, //identificador del coche
    latitud: Number, //posicion actual x
    longitud: Number, //posicion actual y
    nodo: String, //posicion en nodo
    vuelo: String, //numero de vuelo (se sobreentiende que es a fecha de hoy)
    hora: String, //hora anunciadad el vuelo 
    puerta: String, //puerta de embarque
    coche: String //coche que el que se encuentra el pasajero (Ninguno si no está en ningún coche) Esto previene el movimiento aleatorio
 },{collection:'pospasajero'});

module.exports = mongoose.model('pospasajero', PosPasajeroSchema);