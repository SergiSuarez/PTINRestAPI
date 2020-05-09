var express  = require("express"),
    http     = require("http"),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    server   = http.createServer(app),
    app = express(),
    mongoose = require('mongoose');

//var PasajerosModel = require('./models/modelPasajeros');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var PasajerosCtrl = require('./controllers/controllerPasajeros');
var BilletesCtrl = require('./controllers/controllerBilletes');
var BilletesModel = require('./models/modeBilletes')
var router = express.Router();
var billetes = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

mongoose
  .connect('mongodb://a4:ptina4@ptin-a4-test-shard-00-00-ji0m5.mongodb.net:27017/VIA-Test?ssl=true&replicaSet=PTIN-a4-test-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
//    app.use("/api", pasajeros)
    billetes.route('/Billetes')
      .get(BilletesCtrl.findallBilletes)
      .post(BilletesCtrl.addBillete);
    app.use("/api", billetes)
    //app.use(app.router)

    app.listen(3000, () => {
      console.log("Node server running on http://localhost:3000");
    })
  });

const db = mongoose.connection;
db.on('error', console.error.bind('Error de Conexión a la base de datos'));
db.once('open', function(){
  console.log("Conectado a la base de datos");
})




