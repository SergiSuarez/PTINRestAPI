var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CocheSchema = new Schema({
  id_coche: String, //identificador del coche
  matricula: String, //matricula del coche
  posicionx: Number, //posicion actual x
  posiciony: Number, //posicion actual y
  destinox: Number, //destivo coordenada x
  destinoy: Number, //destino coordenada y
  estado: String, //ocupado, cargando, disponible, buscando
  color: String, //color del vehiculo
  pasajero: String, //id_pasajero que estoy llevando o voy a buscar
},{collection:'coches'});

module.exports = mongoose.model('coches', CocheSchema);