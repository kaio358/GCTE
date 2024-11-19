const express = require("express")
const rota = express()

const Transacao = require("../modelos/Transacao")

rota.post("/teste", async(req,res)=>{

    console.log( "oi ?",await Transacao.pegarValores(req.body.idEscola));
    
})

module.exports = rota;