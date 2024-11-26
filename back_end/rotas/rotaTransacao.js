const express = require("express")
const rota = express()

const Transacao = require("../modelos/Transacao")

rota.get("/pegarValores/:id", async(req,res)=>{
    const idEscola = req.params.id

    
    const transacaoPegarValor =  await Transacao.pegarValores(idEscola)
   
    
    res.json(transacaoPegarValor)
   
    
})


rota.get("/dadosParaMensagem", async (req,res)=>{
    const transacaoDadosParaMensagem = await Transacao.dadosParaMensagem()
 
    
    res.json(transacaoDadosParaMensagem);
    
})

rota.post("/dadosDeBusca",async (req,res)=>{
    const {idEscola, nome} = req.body
    // console.log(idEscola,nome);
    
    const transacaoBusca = await Transacao.pessoaEspecificaDaEscola(idEscola,nome)
    res.json(transacaoBusca)
})


module.exports = rota;