const express = require("express")
const rota = express()

const Pessoa = require("../modelos/pessoa")

rota.get("/pessoa/:idEscola",async (req,res)=>{
    const id =  req.params.idEscola
    const lista_pessoas = await Pessoa.lista(id)
    
    res.json(lista_pessoas)
})


module.exports = rota