//Mongoose Schema, per treballar amb mongoose, per relacionar cada 'col·lecció' de la base de dades de MongoDB hem de crear un schema per cada.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Classe persona, conté un nom i un cognom. S'emmagatezma en la col.lecció 'persona' de mongoDB
//Sino s'especifica la col.lecio es creara una col.leccio amb el nom de la classe en plural
var pasajeroSchema = new Schema({
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
      estado:           { type: String }
    }]},
    username: { type: String },
    password: { type: String }
  })
},{collection:'pasajero'});

//Exportem el model del schema per poder treballar amb ell en ../routes/router.js
module.exports = mongoose.model('pasajero', pasajeroSchema);
