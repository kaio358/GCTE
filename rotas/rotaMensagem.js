const express = require("express")
const rota = express();

const Mensagem = require("../modelos/Mensagem")


rota.get("/mensagensImportantes",async (req,res)=>{
    const importantes = await Mensagem.importantes();

    res.json(importantes)

})
rota.post("/mensagemConfirmarLida",(req,res)=>{
    const id = req.body.idPagamento
    console.log(id);
})

module.exports = rota