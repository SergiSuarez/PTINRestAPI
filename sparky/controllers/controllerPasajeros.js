//File: controllers/controllerPasajeros.js
var express = require("express")
var Pasajeros = require("../models/modelPasajeros")
var RoutePasajeros = express.Router()

RoutePasajeros.get("/Pasajeros", async (req, res) => {
    try{
        var pasajeros = await Pasajeros.find()
        res.send(pasajeros)
    }
    catch {
        res.status(1)
        res.send({ error: "Error 1"})
    }
})

RoutePasajeros.get("/Pasajeros/:id", async (req, res) => {
    try {
        var pasajeros = await Pasajeros.findOne({
            _id: req.params.id
        })
    }
    catch {
        res.status(404)
        res.send({ error: "Pasajero inexistente"})
    }
})

RoutePasajeros.post("/Pasajeros", async (req, res) => {
    var pasajeros = new Post({
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
    })
    await pasajeros.save()
    res.send(pasajeros)
})

module.exports = RoutePasajeros