//App routes
module.exports = function(app){ 


//----------------Variables globals
    //Importem tots els schemas de persona que es troben a ../models/A4/... per tal de treballar
    // amb mongo db i la seva col·lecció corresponent
    var pasajero = require('../models/A4/pasajero');
    var billete = require('../models/A4/billetes');
    var interes = require('../models/A4/intereses');
    var negocios = require('../models/A4/negocios');
    var ofertas = require('../models/A4/ofertas');
    var tarjetas = require('../models/A4/tarjetas');
    var vuelos = require('../models/A4/vuelos');
    var ciudades = require('../models/A4/ciudades');
//--------------------------------
//---------------Funcions
consultaVuelos = function(req, res){
  vuelos.find({origen: req.body.origen, destino: req.body.destino, fecha: req.body.fecha_origen}, function(err,existe){
      //if(existe==null){
  //	res.send({"estado":"ko"});
  //}else{
    res.send(existe);
  //}
    });
  };

  login = function(req, res){
  pasajero.findOne({username: req.body.correu, password: req.body.contrasenya}, function(err,existe){
      if(existe==null){
      res.send({"estado":"ko"});
    }else{
      res.send({"estado":"ok"});
    }

    });
  };

  //Nuevo pasajero
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
          password: req.body.password,
          intereses: req.body.intereses
      });
	  pasajero.findOne({username: req.body.username}, function(err,existe){
	  //res.send(existe);
			if(existe==null){
				console.log("Añadido Usuario:", vpasajero.id_ticket);
				vpasajero.save();
				res.send({"estado":"ok"});
			}else{
				res.send({"estado":"ko"});
			}
		});
  };
    //Nuevo vuelo
    nvuelo = function(req, res){
        var vvuelo = new vuelos({
            id: req.body.id, 
            origen: req.body.origen,
            destino: req.body.destino,
            fecha: req.body.fecha,
            hora: req.body.hora,
            aerolinea: req.body.aerolinea,
            puerta: req.body.puerta,
            asientos_a: req.body.asientos_a,
            asientos_t: req.body.asientos_t,
            asientos: req.body.asientos
        });
        console.log("Añadido Vuelo:", vvuelo.id);
        vvuelo.save();
        res.end();
    };

    //Nuevo billete
    nbillete = function(req, res){
        var vbillete = new billete({
            id_ticket: req.body.id_ticket,
            pasajero: req.body.pasajero,
            id_card: req.body.id_card,
            id_user: req.body.id_user,
            id_flight: req.body.id_flight,
            aerolinea: req.body.aerolinea,
            fecha: req.body.fecha,
            hora: req.body.hora,
            puerta: req.body.puerta,
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

    //Nuevo interés
    ninteres = function(req, res){
        var vinteres = new interes({
            interes: req.body.interes
        });
        console.log("Añadido interés:", vinteres.interes);
        vinteres.save();
        res.end();
    };

    //Nuevo negocio
    nnegocio = function(req, res){
        var vnegocio = new negocios({
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            local: req.body.local,
            descripcion: req.body.descripcion,
            intereses: req.body.intereses,
            estado: req.body.estado,
            logo: req.body.logo,
            foto: req.body.foto,
            valoracion: req.body.valoracion
        });
        console.log("Añadido Negocio: ", vnegocio.nombre);
        vnegocio.save();
        res.end();
    };

    //Nueva oferta
    noferta = function(req, res){
        var voferta = new ofertas({
            id_shop: req.body.id_shop,
            descripcion: req.body.descripcion,
            caducidad: req.body.caducidad,
            publico: req.body.publico,
            intereses: req.body.intereses
        });
        console.log("Añadida Oferta: ", voferta.descripcion);
        voferta.save();
        res.send();
    };

    //Nueva tarjeta
    ntarjeta = function(req, res){
        var vtarjeta = new tarjetas({
            id_card: req.body.id_card,
            id_user: req.body.id_user,
            aerolinea: req.body.aerolinea,
            millas: req.body.millas,
            status: req.body.status,
            caducidad: req.body.caducidad
        });
        console.log("Añadida tarjeta: ", vtarjeta.id_card);
        vtarjeta.save();
        res.send();
    };

    nciudad = function(req, res){
        var city = new ciudades({
            ciudad: req.body.ciudad
        });
        console.log("Añadida ciudad: ", city.ciudad);
        city.save();
        res.send();
    };

    listciudades = function(req, res){
        ciudades.find(function(err, city){
            res.send(city);
        });
    };

    //Lista de intereses
    listinteres = function(req, res){
        interes.find(function(err, inter){
            res.send(inter);
        });
    };

    //Lista de vuelos
    listvuelos = function(req, res){
        vuelos.find(function(err, flight){
            res.send(flight);
        });
    };

    //Lista de tarjetas
    listtarjetas = function(req, res){
        tarjetas.find(function(err, cards){
            res.send(cards);
        });
    };

    //Lista de tarjetas por usuario
    listtarjetasbyuser = function(req, res){
    //    console.log("Buscando tarjeta de: ", req.params.iduser);
        tarjetas.find({id_user: req.params.iduser}, function(err, cards){
            res.send(cards);
        });
    };

    //Lista de pasajeros
    listpasajero = function(req, res){
        pasajero.find(function(err, people) {
            res.send(people);
        });
    };

    //Lista de billetes
    listbillete = function(req, res){
        billete.find(function(err, bill) {
            res.send(bill);
        });
    };

    //Lista de negocios
    listnegocios = function(req, res){
        negocios.find(function(err, bizz) {
            res.send(bizz);
        });
    };

    //Lista de negocios de tipo restaurante
    listrestaurantes = function(req, res){
        negocios.find({tipo: "Restaurante"}, function(error, bizz){
            res.send(bizz);
        });
    };

    //Lista de negocios de tipo tienda
    listtiendas = function(req, res){
        negocios.find({tipo: "Tienda"}, function(error, bizz){
            res.send(bizz);
        });
    };

    //Lista de ofertas
    listofertas = function(req, res){
        ofertas.find(function(error, bizz){
            res.send(bizz);
        });
    };

    //Lista de ofertas por fecha de caducidad
    listofertasbydate = function(req, res){
        ofertas.find({caducidad: req.params.caducidad}, function(req, res){
            res.send(bizz);
        });
    };

    //Lista de vuelos por origen/destino/fecha
    listvuelosbyordestdate = function(req, res){
        vuelos.find({origen: req.params.origen, destino: req.params.destino, fecha:req.params.fecha}, function(error, flight){
            res.send(flight)
        })
    };

    //Busqueda d una pasajero concreta per el seu _id
    findpasajero = function(req, res) {
        pasajero.findOne({username: req.params.id}, function(error, person) {
            res.send(person);
        });
    };

    //Busqueda de puerta de embarque por fecha e id
    findpuerta = function(req, res) {
        vuelos.findOne({id: req.params.id, fecha: req.params.fecha}, function(error, door){
            res.send(door);
        });
    };

    listaofertasporpref = function(req, res) {
        pasajero.findOne({username: req.params.username}, {intereses: true, _id: false}, function(req, inte){
            var lista = inte.intereses;
            ofertas.find({intereses: {$in: lista}}, function(req, offers){ 
                res.send(offers);  
            });
        });
    };

    listaofertasporpref = function(req, res) {
        pasajero.findOne({username: req.params.username}, {intereses: true, _id: false}, function(req, inte){
            var lista = inte.intereses;
            ofertas.find({intereses: {$in: lista}}, function(req, offers){ 
                res.send(offers);  
            });
        });
    };

    listanegociosporpref = function(req, res) {
        pasajero.findOne({username: req.params.username}, {intereses: true, _id: false}, function(req, inte){
            var lista = inte.intereses;
            negocios.find({intereses: {$in: lista}}, function(req, offers){ 
                res.send(offers);  
            });
        });
    };

    findimagennegocio = function(req, res) {
        negocios.findOne({nombre: req.params.id}, {logo: true, _id: false}, function(error, door){
            res.send(door);
        });
    };

    //Busqueda de vuelo por id
    findvuelo = function(req, res) {
        vuelos.findOne({_id: req.params.id}, function(error, flight) {
            res.send(flight);
        });
    };

    //Busqueda de todos los billetes por _id
    findbillete = function(req, res) {
        billete.findOne({_id: req.params.id}, function(error, bill) {
            res.send(bill);
        });   
    };

    findvuelosbypasbyfecha = function(req,res){
        console.log ("Buscando vuelos de:", req.params.pasajero, "en fecha", req.params.fecha);
        billete.find({
            "pasajero": req.params.pasajero,
            "fecha": req.params.fecha
        },
        function(err, flight){
            console.log("Flight:", flight);
            
            res.send(flight);
        });
    };

    findvuelobyusertoday = function(req, res){
        pasajero.find({
            "historico.id_user": req.params.id_user,
            "historico.fecha": req.params.fecha
        },
        {
            _id: false,
            "historico.id_flight": true
        },
        function(error, flight){
            res.send(flight);
        });
    };

    //Busqueda de negocio por id
    findnegocios = function(req, res) {
        negocios.findOne({nombre: req.params.id}, function(error, bizz) {
            res.send(bizz);
        });   
    };

    //Busqueda por tarjetas por id
    findtarjetas = function(req, res) {
        tarjetas.findOne({_id: req.params.id}, function(error, cards) {
            res.send(cards);
        });   
    };

    //Esborra un pasajero donant el seu _id
	delpasajero = function(req,res){
		pasajero.deleteOne({_id: req.params.id}, function(error, person) {
            console.log("Eliminado Pasajero:", req.params.id);
        	res.send(person);
        })
    };

    //Borrar vuelo por id
    delvuelo = function(req,res){
		vuelos.deleteOne({_id: req.params.id}, function(error, flight) {
            console.log("Eliminado Vuelo:", req.params.id);
        	res.send(flight);
        })
    };
    
    //Borrar tarjeta por id
    deltarjeta = function(req,res){
		tarjetas.deleteOne({_id: req.params.id}, function(error, cards) {
            console.log("Eliminado Pasajero:", req.params.id);
        	res.send(cards);
        })
	};

    //Esborra un billete donant el seu _id
	delbillete = function(req,res){
		billete.deleteOne({_id: req.params.id}, function(error, bill) {
            console.log("Eliminado Billete:", req.params.id);
        	res.send(bill);
        });
    };

    //Borra un interés por id
    delinteres = function(req,res){
		interes.deleteOne({_id: req.params.id}, function(error, inte) {
            console.log("Eliminado Interés:", req.params.id);
        	res.send(inte);
        });
    };

    //Borra un negocio por id
    delnegocios = function(req,res){
		negocios.deleteOne({_id: req.params.id}, function(error, bizz) {
            console.log("Eliminado Negocio:", req.params.id);
        	res.send(bizz);
        });
    };

    //Borra ofertas por id
    delofertas = function(req,res){
		ofertas.deleteOne({_id: req.params.id}, function(error, bizz) {
            console.log("Eliminada Oferta:", req.params.id);
        	res.send(bizz);
        });
    };
    
    //Modifica els valors especificats d una pasajero identificada pel seu _id.
    //Els camps no especificats es mantindran igual
	updatepasajero = function(req,res){
		pasajero.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizado pasajero: ", req.params.id);
            res.send(upd);
        });
    };

    //Modifica billete por id
    updatebillete = function(req,res){
		billete.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizado billete: ", req.params.id);
            res.send(upd);
        });
    };

    //Modifica interes por id
    updateinteres = function(req,res){
		interes.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizado interés: ", req.params.id);
            res.send(upd);
        });
    };

    //Modifica vuelo por id
    updatevuelo = function(req,res){
		vuelos.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizado vuelo: ", req.params.id);
            res.send(upd);
        });
    };

    //Modifica negocio por id
    updatenegocios = function(req,res){
		negocios.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizado negocio: ", req.params.id);
            res.send(upd);
        });
    };

    //Modifica oferta por id
    updateoferta = function(req,res){
		ofertas.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizada oferta: ", req.params.id);
            res.send(upd);
        });
    };

    //Modifica tarjeta por id
    updatetarjeta = function(req,res){
		targetas.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
            console.log("Actualizada targeta: ", req.params.id);
            res.send(upd);
        });
    };
      
//--------------------------------

//Juntem els diferents mètodes de la API i les diferents formes de cridar-los amb les funcions corresponents
//Tots els següents mètodes és cridaran quan l'usuari introdueixi en la URL http://adreça:port/pasajero i si fa falta /num_id (al final) segons el que es vulgui fer
//--------------------------------POST----------------
//inserim dades a la BDD
app.post('/pasajero', npasajero);
app.post('/billetes', nbillete);
app.post('/intereses', ninteres);
app.post('/negocios', nnegocio);
app.post('/ofertas', noferta);
app.post('/tarjetas', ntarjeta);
app.post('/vuelos', nvuelo);
app.post('/ciudades', nciudad);
app.post('/login', login);
app.post('/consultaVuelos', consultaVuelos);


//--------------------------------GET----------------
//Obtenim dades de la BDD
app.get('/pasajero', listpasajero);
app.get('/billetes', listbillete);
app.get('/intereses', listinteres);
app.get('/negocios', listnegocios);
app.get('/negocios/restaurantes', listrestaurantes);
app.get('/negocios/tiendas', listtiendas);
app.get('/negocios/:id/imagen', findimagennegocio);
app.get('/ofertas', listofertas);
app.get('/tarjetas', listtarjetas);
app.get('/vuelos', listvuelos);
app.get('/vuelos/:origen/:destino/:fecha', listvuelosbyordestdate);
app.get('/ofertas/:caducidad', listofertasbydate);
app.get('/tarjetas/:iduser', listtarjetasbyuser);
app.get('/pasajero/:id', findpasajero);
app.get('/billetes/:id', findbillete);
app.get('/negocios/:id', findnegocios);
app.get('/vuelos/:id', findvuelo);
app.get('/puerta/:id/:fecha', findpuerta);
app.get('/vuelos/:id_user/:fecha', findvuelobyusertoday);
app.get('/billetes/pasajero/:pasajero/:fecha', findvuelosbypasbyfecha);
app.get('/ciudades', listciudades);
app.get('/ofertas/porinteres/:username', listaofertasporpref);
app.get('/negocios/porinteres/:username', listanegociosporpref);
//--------------------------------DELETE----------------
//esborrem dades de la BDD
app.delete('/pasajero/:id', delpasajero);
app.delete('/billetes/:id', delbillete);
app.delete('/intereses/:id', delinteres);
app.delete('/negocios/:id', delnegocios);
app.delete('/ofertas/:id', delofertas);
app.delete('/tarjetas/:id', deltarjeta);
app.delete('/vuelos/:id', delvuelo);
//--------------------------------PUT----------------
//modifiquem dades de la BDD
app.put('/pasajero/:id',updatepasajero);
app.put('/billetes/:id', updatebillete);
app.put('/intereses/:id', updateinteres);
app.put('/negocios/:id', updatenegocios);
app.put('/ofertas/:id', updateoferta);
app.put('/tarjetas/:id', updatetarjeta);
app.put('/vuelos/:id', updatevuelo);


};
