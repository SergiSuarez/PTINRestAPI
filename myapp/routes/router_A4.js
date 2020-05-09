//App routes
module.exports = function(app){ 


//----------------Variables globals
    //Importem tot el schema de persona que hem creat a ../models/persona per tal de treballar
    // amb mongo db i la seva col·lecció persona
    var pasajero = require('../models/A4/pasajero');
    var billete = require('../models/A4/billetes');
//--------------------------------
//---------------Funcions
    //Insertem una persona a la col.leccio
    npasajero = function(req, res){
        var vpasajero = new pasajero({
            id_user: req.body.id_user, 
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            nacio: req.body.nacio,
            genero: req.body.genero,
            vip: req.body.vip,
            disable: req.body.disable,
            telefono: req.body.telefono,
            perfil: req.body.perfil,
            historico: req.body.historico,
            username: req.body.username,
            password: req.body.password
        });
        console.log("Añadido Usuario:", vpasajero.id_ticket);
        vpasajero.save();
        res.end();
    };

    //Insertem un bitllet a la coleccio
    nbillete = function(req, res){
        var vbillete = new billete({
            id_ticket: req.body.id_ticket,
            pasajero: req.body.pasajero,
            id_card: req.body.id_card,
            id_user: req.body.id_user,
            id_flight: req.body.id_flight,
            aerolinea: req.body.aerolinea,
            fecha: req.body.fecha,
            asiento: req.body.asiento,
            vip: req.body.vip,
            disable: req.body.disable,
            maletas_paid: req.body.maletas_paid,
            maletas_checked: req.body.maletas_checked,
            estado: req.body.estado
        });
        console.log("Añadido Billete", vbillete.id_ticket);
        vbillete.save();
        res.end();
    };

    //Busqueda de totes les persones de la col.leccio
    listpasajero = function(req, res){
        pasajero.find(function(err, people) {
            res.send(people);
        });
    };

    //Busqueda de tots els bitllets
    listbillete = function(req, res){
        billete.find(function(err, bill) {
            res.send(bill);
        });
    };

    //Busqueda d una persona concreta per el seu _id
    findpasajero = (function(req, res) {
        pasajero.findOne({_id: req.params.id}, function(error, person) {
            res.send(person);
        });
    });

    //Busqueda de todos los billetes por _id
    findbillete = (function(req, res) {
        billete.findOne({_id: req.params.id}, function(error, bill) {
            res.send(bill);
        });   
    });

    //Esborra un pasajero donant el seu _id
	delpasajero = (function(req,res){
		pasajero.deleteOne({_id: req.params.id}, function(error, person) {
        	res.send(person);
        })
	});

    //Esborra un billete donant el seu _id
	delbillete = (function(req,res){
		billete.deleteOne({_id: req.params.id}, function(error, bill) {
        	res.send(bill);
        });
	});
    //Modifica els valors especificats d una persona identificada pel seu _id.
    //Els camps no especificats es mantindran igual
	updatepasajero = (function(req,res){
		pasajero.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            res.send(upd);
        });
    });

    updatebillete = (function(req,res){
		billete.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            res.send(upd);
        });
    });
      

//--------------------------------

//Juntem els diferents mètodes de la API i les diferents formes de cridar-los amb les funcions corresponents
//Tots els següents mètodes és cridaran quan l'usuari introdueixi en la URL http://adreça:port/pasajero i si fa falta /num_id (al final) segons el que es vulgui fer
//--------------------------------POST----------------
//inserim dades a la BDD
app.post('/pasajero', npasajero);
app.post('/billetes', nbillete);
//--------------------------------GET----------------
//Obtenim dades de la BDD
app.get('/pasajero', listpasajero);
app.get('/billetes', listbillete);
app.get('/pasajero/:id', findpasajero);
app.get('/billetes/:id', findbillete); 
//--------------------------------DELETE----------------
//esborrem dades de la BDD
app.delete('/pasajero/:id', delpasajero);
app.delete('/billetes/:id', delbillete);
//--------------------------------PUT----------------
//modifiquem dades de la BDD
app.put('/pasajero/:id',updatepasajero);
app.put('/billetes/:id', updatebillete);

};

