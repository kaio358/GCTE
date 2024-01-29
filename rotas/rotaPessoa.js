const express = require("express")
const rota = express()

const Pessoa = require("../modelos/pessoa")
const Escola = require("../modelos/escola")

rota.get("/pessoa/escola/:idEscola",async (req,res)=>{
    const id =  req.params.idEscola
    const lista_pessoas = await Pessoa.lista(id)
    const nomeEscola = await Escola.pegaNomeEscola(id)
 
 
    res.json({pessoa: lista_pessoas,escola:  nomeEscola})
})

rota.get("/pessoa/nome/:nome",(req,res)=>{
    const nome = req.params.nome
    console.log(nome);
})


module.exports = rota