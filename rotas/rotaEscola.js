const express = require("express")
const rota = express()

const Escola = require("../modelos/escola")

rota.post('/escola',(req,res)=>{
    const dados = {"nome":req.body.escolaElemento, "horario": req.body.periodoElemento}
    
    Escola.adiciona(dados)
    

})



module.exports = rota