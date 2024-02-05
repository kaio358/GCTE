const express = require("express")
const rota = express()

const Pagamento = require("../modelos/Pagamento")

rota.get("/pagamento/:id",async (req,res)=>{
    const id = req.params.id
    const pagamentoValores = await Pagamento.valores(id)

    res.json(pagamentoValores)
})



module.exports = rota