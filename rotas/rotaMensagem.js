const express = require("express")
const rota = express();

const Mensagem = require("../modelos/Mensagem")


rota.get("/mensagensImportantes",async (req,res)=>{
    const importantes = await Mensagem.importantes();

    res.json(importantes)

})
rota.get("/mensagensLidas", async (req,res)=>{
    const lidas = await Mensagem.lidas();

    res.json(lidas)
})

rota.post("/mensagemConfirmarLida",(req,res)=>{
    const id = req.body.idPagamento
    Mensagem.atualizarOuInseriLidas(id);

    // console.log(id);
})

module.exports = rota