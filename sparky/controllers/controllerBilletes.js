//File: controllers/controllerBilletes.js
var express = require("express")
var mongoose = require("mongoose")
var Billetes = require("../models/modeBilletes")
var RouteBilletes = express.Router()

exports.findallBilletes = function(req, res) {
    Billetes.find(function(err, billetes) {
        if(err) res.send(500, err.message);

        console.log('GET /Billetes')
        console.log(billetes)
        res.status (200)
           .send(billetes)
        //res.send(200, billetes)
    }
    )
}

exports.addBillete = function(req, res) {
    console.log('POST /Billetes');
    console.log(req.body);

    var billete = new mBilletes({
        id_ticket:        req.body.id_ticket,
        pasajero:         req.body.pasajero,
        id_card:          req.body.id_card,
        id_user:          req.body.id_user,
        id_flight:        req.body.id_flight,
        aerolinea:        req.body.aerolinea,
        fecha:            req.body.fecha,
        asiento:          req.body.asiento,
        vip:              req.body.vip,
        disable:          req.body.disable,
        maletas_paid:     req.body.maletas_paid,
        maletas_checked:  req.body.maletas_checked,
        estado:           req.body.estado
    });

    billete.save(function(err, billet){
        if(err) return res.status(500).send(err.message);
    res.status(200).jsonp(billete)
    })
}


/*RouteBilletes.get("/Billetes", async (req, res) => {
try{
    var billetes = await Billetes.find(function (err, res))
    res.send(billetes)
}
catch {
    res.status(1)
    res.send({ error: "Error 1"})
}
})

module.exports = RouteBilletes*/