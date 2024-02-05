const express = require("express")
const rota = express()

const Pessoa = require("../modelos/Pessoa")
const Escola = require("../modelos/Escola")

rota.get("/pessoa/escola/:idEscola",async (req,res)=>{
    const id =  req.params.idEscola
    const lista_pessoas = await Pessoa.lista(id)
    const nomeEscola = await Escola.pegaNomeEscola(id)
 
 
    res.json({pessoa: lista_pessoas,escola:  nomeEscola})
})

rota.get("/pessoa/nome/:nome/:id",async(req,res)=>{
    const nome = req.params.nome
    const id = req.params.id

    const nomePessoas = await Pessoa.nomeLista(nome,id)
    console.log(nomePessoas);
})


module.exports = rota