const express = require("express")
const rota = express()

const Escola = require("../modelos/escola")

rota.get('/escola',async (req,res)=>{
    const dados = await Escola.lista()
    res.json(dados)

  
})

rota.post('/escola',(req,res)=>{
    const dados = {"nome":req.body.escolaElemento, "horario": req.body.periodoElemento}
    
    Escola.adiciona(dados)
    

})
rota.delete('/escola',(req,res)=>{
    const id = req.body.id
    console.log(id);
    Escola.deleta(id)
})
rota.put('/escola',(req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const horario = req.body.horario
    Escola.atualizar(id,nome,horario)
    
})



module.exports = rota