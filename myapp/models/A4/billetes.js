var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var BilletesSchema = new Schema({
  id_ticket: String,
  qr: String,
  pasajero: String,
  id_card: String,
  id_user: String,
  id_flight: String,
  aerolinea: String,
  fecha: String,
  asiento: String,
  vip: Boolean,
  disable: Boolean,
  maletas_paid: Number,
  maletas_checked: Number,
  estado: String
},{collection:'billetes'});

module.exports = mongoose.model('billetes', BilletesSchema);