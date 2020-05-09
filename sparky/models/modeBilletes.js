var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var BilletesSchema = new Schema({
  id_ticket:        { type: String },
  pasajero:         { type: String },
  id_card:          { type: String },
  id_user:          { type: String },
  id_flight:        { type: String },
  aerolinea:        { type: String },
  fecha:            { type: String },
  asiento:          { type: String },
  vip:              { type: Boolean },
  disable:          { type: Boolean },
  maletas_paid:     { type: Number },
  maletas_checked:  { type: Number },
  estado:           { type: String },
});

module.exports = mongoose.model('mBilletes', BilletesSchema);