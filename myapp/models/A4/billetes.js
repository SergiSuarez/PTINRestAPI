var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var BilletesSchema = new Schema({
  id_ticket: String,        //localizador del billete
  qr: String,               //ruta a la imagen del qr
  pasajero: String,         //nombre completo del pasajero
  username: String,         //email del pasajero
  id_card: String,          //numero de tarjate de fidelidad (si la tiene)
  id_user: String,          //identificación del pasajero (DNI o Pasaporte)
  id_flight: String,        //id del vuelo
  aerolinea: String,        //aerolinea del vuelo
  fecha: String,            //fecha del vuelo
  hora: String,             //hora del vuelo
  puerta: String,           //puerta de embarque (si la tiene asignada)
  asiento: String,          //asiento del pasajero (si lo tiene asignado)
  vip: Boolean,             //bool que indica si el pasajero es vip (idem al del pasajero)
  disable: Boolean,         //bool que indica si es una persona de movilidad reducida
  maletas_paid: Number,     //numero de maletas pagadas
  maletas_checked: Number,  //número de maletas facturadas
  estado: String            //estado del pasajero (se encuentra en la terminal etc...)
},{collection:'billetes'});

module.exports = mongoose.model('billetes', BilletesSchema);