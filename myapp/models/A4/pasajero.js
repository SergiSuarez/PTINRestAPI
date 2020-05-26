//Mongoose Schema, per treballar amb mongoose, per relacionar cada 'col·lecció' de la base de dades de MongoDB hem de crear un schema per cada.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Classe persona, conté un nom i un cognom. S'emmagatezma en la col.lecció 'persona' de mongoDB
//Sino s'especifica la col.lecio es creara una col.leccio amb el nom de la classe en plural
var pasajeroSchema = new Schema({
    id_user: String,            //DNI o pasaporte
    nombre: String,             //Nombre completo del pasajero sin apellido(s)
    apellidos: String,          //Apellido(s) del pasajero
    nacio: String,              //Fecha de nacimiento
    genero: String,             //Hombre, Mujer
    vip: Boolean,               //Bool que indica si es vip
    disable: Boolean,           //Bool que indica si es PMR
    telefono: String ,          //Teléfono de contacto
    perfil: String,             //Perfil del usuario (es pasajero o administrador)
    intereses: [String],        //Array de intereses para que haya match con ofertas/negocios
    historico: [{               //Array de billetes que tiene asociados
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
    username: String,           //email del pasajero
    password: String            //contraseña de acceso
},{collection:'pasajero'});

//Exportem el model del schema per poder treballar amb ell en ../routes/router.js
module.exports = mongoose.model('pasajero', pasajeroSchema);
