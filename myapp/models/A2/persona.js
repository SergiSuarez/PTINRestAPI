//Mongoose Schema, per treballar amb mongoose, per relacionar cada 'col·lecció' de la base de dades de MongoDB hem de crear un schema per cada.
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Classe persona, conté un nom i un cognom. S'emmagatezma en la col.lecció 'persona' de mongoDB
//Sino s'especifica la col.lecio es creara una col.leccio amb el nom de la classe en plural
var personaSchema = new Schema({
    name: String,
    lastName: String
},{collection:'persona'});

//Exportem el model del schema per poder treballar amb ell en ../routes/router.js
module.exports = mongoose.model('persona', personaSchema);
