//App routes
module.exports = function(app){

    //----------------Variables globals
        //Importem tot el schema de persona que hem creat a ../models/persona per tal de treballar
        // amb mongo db i la seva col·lecció persona
        var coche = require('../models/A4/coche');
        var lista = require('../models/A4/listaespera');
        var pasajero = require('../models/A4/pospasajero');
        var node = require('../models/A4/localizaciones');
        var fetch = require("node-fetch");
    //--------------------------------
    //---------------Funcions
        //Insertem una cotxe a la col.leccio
        newcoche = function(req, res){
            var car = new coche({
                id_coche: req.body.id_coche, 
                puntOrigencotxe: req.body.puntOrigencotxe,
                puntOrigen: req.body.puntOrigen,
                puntDesti: req.body.puntDesti,
                puntActual: req.body.puntActual,
                estado: req.body.estado,
                id_pasajero: req.body.id_pasajero,
                ruta_pasajero: req.body.ruta_pasajero,
                ruta_desti: req.body.ruta_desti   
            });
            coche.findOne({id_coche: req.body.id_coche}, function(error, carro) {
                if (carro==null){
                    car.save();
                    res.send({"estado":"ok"});
                }
                else{
                    res.send({"estado":"ko"})
                };
            });
        };
        
        //Insertem una pasatger a la llista d'espera dels cotxes
        newlista = function(req, res){
            var list = new lista({
                id_pasajero: req.body.id_pasajero,
                vip: req.body.vip,
                disable: req.body.disable,
                nodoactual: req.body.nodoactual,
                nododestino: req.body.nododestino,
            });
            list.save();
            res.send();
        };
        //Insertem un pasatger amb la seva posició
        newpospasajero = function(req, res){
            var posicion = new pasajero({
                id_pasajero: req.body.id_pasajero,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                nombre: req.body.nodo,
                vuelo: req.body.vuelo,
                hora: req.body.hora,
                puerta: req.body.puerta,
                coche: req.body.coche
            });
            posicion.save();
            res.send();
        };

        //Insertem un nou node de posicionament
        newnodo = function(req, res){
            var posicion = new node({
                nombre_nodo: req.body.nombre_nodo,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                nodos_vecinos: req.body.nodos_vecinos
            });
            posicion.save();
            res.send();
        };
    
        //Llistem tots els nodes
        listnodos = function(req, res){
            node.find(function(err, nod) {
                res.send(nod);
            });
        };

        initialnode = function(req, res){
            node.find(function(err, list) {
                var result = list[Math.floor(Math.random() * list.length)];
                res.send(result);
            });
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

        findlistabyemail = function(req, res){
            lista.findOne({username: req.params.username}, function(req, lis){
                res.send(lis);
            });
        };

        //Llista de tots els passatgers i la seva posició
        listpospasajero = function(req, res){
            pasajero.find(function(req, lis){
                res.send(lis);
            });
        };

        listpospasajeroporhora = function(req, res){
            pasajero.find({hora: req.params.time},function(req, lis){
                res.send(lis);
            });
        };

        listpospasajeroporvuelo = function(req, res){
            pasajero.find({vuelo: req.params.flight}, function(req, lis){
                res.send(lis);
            });
        };

        //Busquem el proper pasatger a ser recollit
        nextlista = function(req, res){
            lista.findOne(function(req, next){
                if (!isEmpty(next)){
                    lista.deleteOne({id_coche: next.id_coche}, function(req, del){
                        res.send(next);
                    });
                }
                else{
                    res.send('No hay más pasajeros');
                };
            });
        };
    
        //Busqueda d'un cotxe concret per el seu _id
        findcoche = function(req, res) {
            coche.findOne({id_coche: req.params.id}, function(error, car) {
                res.send(car);
            });
        };

        findcochesdisponibles = function(req, res){
            coche.find({estado: "disponible"}, function(req, car){
                res.send(car);
            });
        };

        findnodo = function(req, res) {
            node.findOne({nodo: req.params.nodo}, {longitud: true, latitud: true, _id:false}, function(error, nod){
                res.send(nod);
            });
        };

        findlatlong = function(req, res){
            node.findOne({longitud: req.params.longitud, latitud: req.params.latitud}, {nodo: true, _id: false}, function(error, nod){
                res.send(nod);
            });
        };

        //Busqueda d'un pasatger pel seu id_pasajero
        findpasajero = function(req, res) {
            pasajero.findOne({id_pasajero: req.params.id}, function(error, pos) {
                res.send(pos);
            });
        };
    
        //Esborra un cotxe donant el seu _id
        delcoche = function(req,res){
            coche.deleteOne({id_coche: req.params.id}, function(error, car) {
                res.send(car);
            });
        };

        //Esborra un pasatger de la llista d'espera p.ex. quan un cotxe va a buscar-ho
        dellista = function(req, res) {
            lista.deleteOne({_id: req.params.id}, function(error, listd){
                res.send(listd);
            });
        };

        deluserlista = function(req, res) {
            lista.deleteOne({username: req.params.username}, function(error, listd){
                res.send(listd);
            });
        };

        //Esborra un pasatger de la llista de posicions p.ex. quan ja no hi és a la terminal
        delpospasajero = function(req, res) {
            pasajero.deleteOne({id_pasajero: req.params.id_pasajero}, function(error, listp){
                res.send(listp);
            });
        };

        delnodo = function(req, res) {
            node.deleteOne({_id: req.params.nodo}, function(error, listp){
                res.send(listp);
            });
        };
    
        //Modifica els valors especificats d una cotxe identificada pel seu _id.
        //Els camps no especificats es mantindran igual
        updatecoche = function(req,res){
            coche.updateOne({id_coche: req.params.id_coche},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        };


        updatenodo = function(req,res){
            node.updateOne({nombre_nodo: req.params.nodo},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        };

        //Modifica els valors especificats d'una persona en llista d'espera
        updatelista = function(req, res){
            lista.updateOne({id_pasajero: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        };

        updatepospasajero = function(req, res){
            pasajero.updateOne({id_pasajero: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
                res.send(upd);
            });
        };

        randompos = function(req, res){
            node.findOne({nombre_nodo: req.params.nodo},function(req, nod){
                var lista = nod.nodos_vecinos.split(',');
                var result = lista[Math.floor(Math.random() * lista.length)];
                console.log(result);
                var consulta = {};
                consulta['nombre_nodo'] = result;
                console.log(consulta);
                node.findOne(consulta, function(req, resp){
                    console.log(resp);
                    res.send(resp);
                });           
            });
        };

        encochar = function(req, res){
            var opscoche = {};
            var opspasajero = {};
            opscoche['id_pasajero'] = req.params.id_pasajero;
            opscoche['estado'] = "ocupado";
            opspasajero['coche'] = req.params.id_coche;
            coche.updateOne({id_coche: req.params.id_coche}, opscoche, function(reqcoche, res_coche){
                pasajero.updateOne({id_pasajero: req.params.id_pasajero}, opspasajero, function(reqpasajero, res_pasajero){
                    res.send(res_coche);
                });
            });

        };

        desencochar = function(req, res){
            var opscoche = {};
            var opspasajero = {};
            opscoche['id_pasajero'] = "";
            opscoche['estado'] = "disponible";
            opspasajero['coche'] = "Ninguno";
            coche.updateOne({id_coche: req.params.id_coche}, opscoche, function(reqcoche, res_coche){
                pasajero.updateOne({id_pasajero: req.params.id_pasajero}, opspasajero, function(reqpasajero, res_pasajero){
                    res.send(res_coche);
                });
            });
        };

        randomposbypass = function(req, res){
            pasajero.findOne({id_pasajero: req.params.id_pasajero}, function(error, pos){
            //console.log('id_pasajero: ',req.params.id_pasajero);
            var pass = req.params.id_pasajero;
            //console.log('pos:',pos);
            if(isEmpty(pos)){
                //console.log('Entrada del pasajero:', req.params.id_pasajero);
                node.find(function(req, nod){
                    var lista=new Array;
                    for (i=0; i<nod.length; i++){
                        lista[i]=nod[i].nombre_nodo;
                    };
                    var result = lista[Math.floor(Math.random() * lista.length)];
                    //console.log('Result:',result);
                    var consulta = {};
                    //consulta['nombre_nodo'] = result;
                    //console.log('Consulta:',consulta);
                    node.findOne(consulta, function(req, resp){
                        var parpas = new pasajero;
                        parpas['id_pasajero'] = pass;
                        parpas['nodo'] = resp.nombre_nodo;
                        parpas['longitud'] = resp.longitud;
                        parpas['latitud'] = resp.latitud;
                        parpas['vuelo'] = "";
                        parpas['hora'] = "";
                        parpas['puerta'] = "";
                        parpas['coche'] = "Ninguno";
                        var urlcloud = "http://localhost:3000/billetes/pasajero/"
                        //var urlcloud = "http://craaxcloud.epsevg.upc.edu:36301/billetes/pasajero/"
                        var today = new Date;
                        var dd = today.getDate();
                        if (dd<10){
                            dd = '0'+dd;
                        };
                        var mm = today.getMonth() + 1;
                        console.log('mes:',mm);
                        if (mm<10){
                            mm = '0'+mm;
                        };
                        var yyyy = today.getFullYear();
                        today = yyyy+'-'+mm+'-'+dd;
                        urlcloud = urlcloud+pass+'/'+today;
                        //console.log('urlcloud:',urlcloud);
                        fetch(urlcloud)
                        .then((resp) => resp.json())
                            //return response.json();
                        .then(function(data) {
                            //console.log('Data:', data);
                            parpas['vuelo'] = data[0].id_flight;
                            parpas['hora'] = data[0].hora;
                            parpas['puerta'] = data[0].puerta;
                            parpas.save();
                            if (isEmpty(data)){
                                res.send({"estado":"ko"});
                            }
                            else{
                                res.send(parpas);
                            }
                        });
                    });
                });
                //res.send();
            }
            else
            {
                var posicion = pos.nodo;
                var vehiculo = pos.coche;
                console.log(posicion);
                var consulta = {};
                consulta['nombre_nodo'] = posicion;
                if (vehiculo == 'Ninguno'){
                    node.findOne(consulta,function(req, nod){
                        var lista = nod.nodos_vecinos.split(',');
                        var result = lista[Math.floor(Math.random() * lista.length)];
                        consulta['nombre_nodo'] = result;
                        node.findOne(consulta, function(req, resp){
                            console.log(resp);
                            parpas = {};
                            parpas['id_pasajero'] = pass;
                            conpas = {};
                            conpas['nodo'] = resp.nombre_nodo;
                            conpas['longitud'] = resp.latitud;
                            conpas['latitud'] = resp.longitud;
                            pasajero.updateOne(parpas,conpas,{safe:true}, function(error, upd){
                                pasajero.findOne(parpas, function(error, pos){
                                    res.send(pos);
                                });
                            });
                        }); 
                    });
                }
                else{
                    coche.findOne({id_coche: vehiculo},function(req, car){
                        node.findOne({nombre_nodo: car.puntActual}, function(req, resp){
                            console.log(resp);
                            parpas = {};
                            parpas['id_pasajero'] = pass;
                            conpas = {};
                            conpas['nodo'] = resp.nombre_nodo;
                            conpas['longitud'] = resp.latitud;
                            conpas['latitud'] = resp.longitud;
                            pasajero.updateOne(parpas,conpas,{safe:true}, function(error, upd){
                                pasajero.findOne(parpas, function(error, pos){
                                    res.send(pos);
                                });
                            });
                        });
                    })
                }
            }
        });
        
    };
    
    //--------------------------------
    
    //Juntem els diferebts métodes de la API i les diferents formes de cridar-los amb les funcions corresponents
    //Tots els següents métodes és cridaran quan l'usuari introdueixi en la URL http://adreça:port/person i si fa falta /num_id (al final) segons el que es vulgui fer
    //--------------------------------POST----------------
    //inserim dades a la BDD
    app.post('/coches', newcoche);
    app.post('/listaespera', newlista);
    app.post('/pospasajeros', newpospasajero);
    app.post('/nodos', newnodo);
    //--------------------------------GET----------------
    //Obtenim dades de la BDD
    app.get('/coches', listcoche);
    app.get('/coches/disponibles', findcochesdisponibles);
    app.get('/listaespera', listlista);
    app.get('/listaespera/byemail/:username', findlistabyemail);
    app.get('/listaespera/next', nextlista);
    app.get('/nodos', listnodos);
    app.get('/coches/:id', findcoche);
    app.get('/pospasajeros', listpospasajero);
    app.get('/pospasajeros/:id', findpasajero);
    app.get('/pospasajeros/hora/:time', listpospasajeroporhora)
    app.get('/pospasajeros/vuelo/:flight', listpospasajeroporvuelo)
    app.get('/nodos/:nodo', findlatlong);
    app.get('/nodos/:longitud/:latitud', findnodo);
    app.get('/nodos/random/position/:id_pasajero', randomposbypass);
    app.get('/encochar/:id_coche/:id_pasajero',encochar);
    app.get('/desencochar/:id_coche/:id_pasajero',desencochar);
    app.get('/listaespera/borrar/:username', deluserlista);
    //--------------------------------DELETE----------------
    //esborrem dades de la BDD
    app.delete('/coches/:id', delcoche);
    app.delete('/listaespera/:id', dellista);
    app.delete('/pospasajeros/:id_pasajero', delpospasajero);
    app.delete('/nodos/:nodo', delnodo);
    //--------------------------------PUT----------------
    //modifiquem dades de la BDD
    app.put('/coches/:id_coche',updatecoche);
    app.put('/listaespera/:id',updatelista);
    app.put('/pospasajeros/:id',updatepospasajero);
    app.put('/nodos/:nodo', updatenodo);
    };

    //Funcions auxiliars

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    