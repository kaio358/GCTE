const express = require("express")
const rota = express()

const Escola = require("../modelos/Escola")

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

rota.get('/escola',async (req,res)=>{
    const dados = await Escola.lista()
    res.json(dados)

  
})

rota.post('/escola',upload.single('image'),(req,res)=>{
    const dados = {"nome":req.body.escolaElemento, "horario": req.body.periodoElemento}
    console.log(req.file.path, dados);
    // res.json({dados:dados, imagem: req.file})
    // const escolaAdciona =   Escola.adiciona(dados)
    // console.log(escolaAdciona);
    

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