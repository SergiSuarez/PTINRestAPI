var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var PasajerosSchema = new Schema({
  id_user:    { type: String },
  nombre:     { type: String },
  apellidos:  { type: String },
  nacio:      { type: String },
  genero:    { type: String, enum:
  ['Hombre', 'Mujer']
  },
  vip:      { type: Boolean },
  disable:  { type: Boolean },
  telefono: { type: String },
  perfil:   { type: String, enum:
    ['Pasajero','Administracion','Tiendas']
  },
  historico: { type: [{
    _id:              { type: String },
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
  }]},
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('Pasajeros', PasajerosSchema);