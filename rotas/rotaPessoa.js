const express = require("express")
const rota = express()

const Pessoa = require("../modelos/pessoa")
const Escola = require("../modelos/escola")

rota.get("/pessoa/:idEscola",async (req,res)=>{
    const id =  req.params.idEscola
    const lista_pessoas = await Pessoa.lista(id)
    const nomeEscola = await Escola.pegaNomeEscola(id)
    // console.log(lista_pessoas[0]);
    res.json({pessoa: lista_pessoas,escola:  nomeEscola})
})


module.exports = rota