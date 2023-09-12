const express = require("express")
const rota = express()

const Escola = require("../modelos/escola")

rota.post('/escola',(req,res)=>{
    const dados = {"nome":req.body.periodoElemento, "horario":req.body.escolaElemento}
    
    Escola.adiciona(dados)
    

})



module.exports = rota