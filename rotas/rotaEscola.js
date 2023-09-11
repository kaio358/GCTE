const express = require("express")
const rota = express()

const Escola = require("../modelos/escola")

rota.post('/gerenciar/escola',(req,res)=>{
    const dados = {"nome":req.body.periodoElemento, "horario":req.body.escolaElemento}
    
    Escola.adiciona(dados)
    res.send("dados recebidos : ", dados)
})



module.exports = rota