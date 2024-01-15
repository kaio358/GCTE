const express = require('express')
const rota = express()

const Imagens = require('../modelos/imagens')


// pega imagens uma imagem

rota.get('/imagens/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    res.json( await Imagens.buscaPorId(id))
})


// Lista de imagens

rota.get('/imagens',async (req,res)=>{
    const lista_imagens = await Imagens.lista()
    res.json(lista_imagens)
})


