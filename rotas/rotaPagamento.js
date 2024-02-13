const express = require("express")
const rota = express()

const Pagamento = require("../modelos/Pagamento")

rota.get("/pagamento/:id",async (req,res)=>{
    const id = req.params.id
    const pagamentoValores = await Pagamento.valores(id)

    res.json(pagamentoValores)
})

rota.post("/pagamento/confirmacao",async (req,res)=>{
    const id = req.body.id;
    const pagou = req.body.pagou;
    // const confirmacao =  await  Pagamento.confirmar(pagou,id)
   
    console.log(pagou,id);

})



module.exports = rota