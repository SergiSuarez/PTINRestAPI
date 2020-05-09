//App routes
module.exports = function(app){

//----------------Variables globals
    //Importem tot el schema de persona que hem creat a ../models/persona per tal de treballar
    // amb mongo db i la seva col·lecció persona
    var persona = require('../models/A2/persona');
//--------------------------------
//---------------Funcions
    //Insertem una persona a la col.leccio
    person = function(req, res){
        var person = new persona({name: req.body.name, lastName: req.body.lastName});
        person.save();
        res.end();
    };

    //Busqueda de totes les persones de la col.leccio
    list = function(req, res){
        persona.find(function(err, people) {
            res.send(people);
        });
    };

    //Busqueda d una persona concreta per el seu _id
    find = (function(req, res) {
        persona.findOne({_id: req.params.id}, function(error, person) {
            res.send(person);
          })
    });

    //Esborra un usuari donant el seu _id
	  del = (function(req,res){
		    persona.deleteOne({_id: req.params.id}, function(error, person) {
        		res.send(person);
        	})
	  });

    //Modifica els valors especificats d una persona identificada pel seu _id.
    //Els camps no especificats es mantindran igual
	  updateALL = (function(req,res){
		    persona.updateOne({_id: req.params.id},{$set:req.body},{safe:true}, function(error, upd){
                        res.send(upd);
          })
  	});

//--------------------------------

//Juntem els diferebts métodes de la API i les diferents formes de cridar-los amb les funcions corresponents
//Tots els següents métodes és cridaran quan l'usuari introdueixi en la URL http://adreça:port/person i si fa falta /num_id (al final) segons el que es vulgui fer
//--------------------------------POST----------------
//inserim dades a la BDD
app.post('/person', person);
//--------------------------------GET----------------
//Obtenim dades de la BDD
app.get('/person', list);
app.get('/person/:id', find);
//--------------------------------DELETE----------------
//esborrem dades de la BDD
app.delete('/person/:id', del);
//--------------------------------PUT----------------
//modifiquem dades de la BDD
app.put('/person/:id',updateALL);

};
