//Mongoose Schema, per treballar amb mongoose, per relacionar cada 'col·lecció' de la base de dades de MongoDB hem de crear un schema per cada.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Classe persona, conté un nom i un cognom. S'emmagatezma en la col.lecció 'persona' de mongoDB
//Sino s'especifica la col.lecio es creara una col.leccio amb el nom de la classe en plural
var pasajeroSchema = new Schema({
    id_user: String,
    nombre: String,
    apellidos: String,
    nacio: String,
    genero: String,
    vip: Boolean,
    disable: Boolean,
    telefono: String ,
    perfil: String,
    intereses: [String],
    historico: [{
      _id: {
        oid: String
      },
      id_ticket: String,
      pasajero: String,
      id_card: String,
      id_user: String ,
      id_flight: String,
      aerolinea: String,
      fecha: String,
      asiento: String,
      vip: Boolean,
      disable: Boolean,
      maletas_paid: Number,
      maletas_checked: Number,
      estado: String
    }],
    username: String,
    password: String
},{collection:'pasajero'});

//Exportem el model del schema per poder treballar amb ell en ../routes/router.js
module.exports = mongoose.model('pasajero', pasajeroSchema);
