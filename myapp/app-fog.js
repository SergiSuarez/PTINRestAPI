/* API per el projecte de VIA
Autors: grup A2 de PTIN
Any: 2019-2020
Versió: beta, prototip
*/
//------------Carreguem els móduls necesaris
var express = require("express"); //framework web
var bodyParser  = require("body-parser"); // analitza el contingut del cos, per interpretar les dades
var methodOverride = require("method-override"); //paquet que permet realitzar PUT
var mongoose = require('mongoose'); //framework per base de datos MongoDB
var http = require('http'); //framework permet utilizar peticiones http


var app = express(); //Comencem a utilitzar express per utilitzat els métodes de la API a través de les peticions HTTP
var router = express.Router(); //crea un objecte enrutador que habilita l us de GET, POST, PUT, DELETE

//Habilitem les funcions que hem creat anteriormet perquè es puguin utilitzar
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(router);

//Indiquem on estaran les routes, métodes bàsics de la API REST
//routesA1=require('./routes/router_A1')(app);
//routesA2=require('./routes/router_A2')(app);
//routesA3=require('./routes/router_A3')(app);
routesfog=require('./routes/router_fog')(app);

//Intentem fer una connexio la nostre BDD de MongoDB amb l usuari admin
//L estructura de la connexio -> mongodb://user:psswd@addres:port/database?authSource=user
try {
//  mongoose.connect('mongodb://admin:admin@192.168.1.6:27017/persona?authSource=admin',{ useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connect('mongodb://admin:admin@192.168.1.6:27017/fog?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on("error", error => console.log(error));
  db.once("open", () => console.log("Connection to the database established"));
}catch(error){
  console.error(error);
}
 // Iniciem el servidor de la API al port 3000
app.listen(3001, function() {
  console.log("Node server running on http://ip_del_host:3001");
});