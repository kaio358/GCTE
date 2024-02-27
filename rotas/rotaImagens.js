const express = require('express')
const rota = express()

const Imagens = require('../modelos/Imagens')

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

// pega imagens uma imagem

rota.get('/imagem/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    res.json( await Imagens.buscaPorId(id))
})


// Lista de imagens

rota.get('/imagens',async (req,res)=>{
    const lista_imagens = await Imagens.lista()
    res.json(lista_imagens)
})
// pega imagens pelo idEscola
rota.get('/image/escola/:id', (req,res)=>{
   
  console.log("ola",req.params);
})

module.exports = rota