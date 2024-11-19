const express = require("express")
const rota = express()

const Transacao = require("../modelos/Transacao")

rota.get("/pegarValores/:id", async(req,res)=>{
    const idEscola = req.params.id
    // console.log(idEscola);
    
    const transacaoPegarValor =  await Transacao.pegarValores(idEscola)
    res.json(transacaoPegarValor)
    // console.log( "oi ?",await Transacao.pegarValores(idEscola));
    
})





module.exports = rota;