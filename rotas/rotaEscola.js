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
rota.delete('/escola/:id',(req,res)=>{
    const id = req.params.id
    Escola.deleta(id)
})




module.exports = rota