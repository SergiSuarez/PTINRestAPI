//App routes
module.exports = function(app){

    //----------------Variables globals
        //Importem tot el schema de persona que hem creat a ../models/persona per tal de treballar
        // amb mongo db i la seva col·lecció persona
        var coche = require('../models/A4/coche');
        var lista = require('../models/A4/listaespera');
        var pasajero = require('../models/A4/pospasajero');
    //--------------------------------
    //---------------Funcions
        //Insertem una cotxe a la col.leccio
        newcoche = function(req, res){
            var car = new coche({
                id_coche: req.body.id_coche, 
                matricula: req.body.matricula,
                posicionx: req.body.posicionx,
                posiciony: req.body.posiciony,
                destinox: req.body.destinox,
                destinoy: req.body.destinoy,
                estado: req.body.estado,
                color: req.body.color,
                pasajero: req.body.pasajero    
            });
            car.save();
            res.end();
        };
        
        //Insertem una pasatger a la llista d'espera dels cotxes
        newlista = function(req, res){
            var list = new lista({
                id_pasajero: req.body.id_pasajero,
                vip: req.body.vip,
                disable: req.body.disable,
                posicionx: req.body.posicionx,
                posiciony: req.body.posiciony,
                destinox: req.body.destinox,
                destinoy: req.body.destinoy
            });
            list.save();
            res.send();
        };
        //Insertem un pasatger amb la seva posició
        newpospasajero = function(req, res){
            var posicion = new pasajero({
                id_pasajero: req.body.id_pasajero,
                posicionx: req.body.posicionx,
                posiciony: req.body.posiciony
            });
            posicion.save();
            res.send();
        };
    
        //Busqueda de tots els cotxes de la col.leccio
        listcoche = function(req, res){
            coche.find(function(err, car) {
                res.send(car);
            });
        };

        //Busqueda de totes les persones en llista d'espera
        listlista = function(req, res){
            lista.find(function(req, lis){
                res.send(lis);
            });
        };

        //Llista de tots els passatgers i la seva posició
        listpospasajero = function(req, res){
            pasajero.find(function(req, lis){
                res.send(lis);
            });
        };

        //Busquem el proper pasatger a ser recollit
        nextlista = function(req, res){
            lista.findOne(function(req, next){
                res.send(next);
            });
        };
    
        //Busqueda d'un cotxe concret per el seu _id
        findcoche = (function(req, res) {
            coche.findOne({id_coche: req.params.id}, function(error, car) {
                res.send(car);
            });
        });

        //Busqueda d'un pasatger pel seu id_pasajero
        findpasajero = (function(req, res) {
            pasajero.findOne({id_pasajero: req.params.id}, function(error, pos) {
                res.send(pos);
            });
        });
    
        //Esborra un cotxe donant el seu _id
        delcoche = (function(req,res){
            coche.deleteOne({_id: req.params.id}, function(error, car) {
                res.send(car);
            });
        });

        //Esborra un pasatger de la llista d'espera p.ex. quan un cotxe va a buscar-ho
        dellista = (function(req, res) {
            lista.deleteOne({_id: req.params.id}, function(error, listd){
                res.send(listd);
            });
        });

        //Esborra un pasatger de la llista de posicions p.ex. quan ja no hi és a la terminal
        delpospasajero = (function(req, res) {
            pasajero.deleteOne({_id: req.params.id}, function(error, listp){
                res.send(listp);
            });
        });
    
        //Modifica els valors especificats d una cotxe identificada pel seu _id.
        //Els camps no especificats es mantindran igual
        updatecoche = (function(req,res){
            coche.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        });

        //Modifica els valors especificats d'una persona en llista d'espera
        updatelista = (function(req, res){
            lista.updateOne({id_pasajero: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        });

        updatepospasajero = (function(req, res){
            pasajero.updateOne({id_pasajero: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        });
    
    //--------------------------------
    
    //Juntem els diferebts métodes de la API i les diferents formes de cridar-los amb les funcions corresponents
    //Tots els següents métodes és cridaran quan l'usuari introdueixi en la URL http://adreça:port/person i si fa falta /num_id (al final) segons el que es vulgui fer
    //--------------------------------POST----------------
    //inserim dades a la BDD
    app.post('/coches', newcoche);
    app.post('/listaespera', newlista);
    app.post('/pospasajeros', newpospasajero);
    //--------------------------------GET----------------
    //Obtenim dades de la BDD
    app.get('/coches', listcoche);
    app.get('/listaespera', listlista);
    app.get('/listaespera/next', nextlista);
    app.get('/coches/:id', findcoche);
    app.get('/pospasajeros', listpospasajero);
    app.get('/pospasajeros/:id', findpasajero);
    //--------------------------------DELETE----------------
    //esborrem dades de la BDD
    app.delete('/coches/:id', delcoche);
    app.delete('/listaespera/:id', dellista);
    app.delete('/pospasajeros/:id', delpospasajero);
    //--------------------------------PUT----------------
    //modifiquem dades de la BDD
    app.put('/coches/:id',updatecoche);
    app.put('/listaespera/:id',updatelista);
    app.put('/pospasajeros/:id',updatepospasajero);
    };

    