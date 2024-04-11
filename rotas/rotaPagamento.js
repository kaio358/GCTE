const express = require("express")
const rota = express()

const Pagamento = require("../modelos/Pagamento")

rota.get("/pagamento/:id",async (req,res)=>{
    const id = req.params.id
    // const pagamentoValores = await Pagamento.valores(id)
    const pagamentoPeloMes = await Pagamento.pegarValorPorMesmaData(id)


    res.json(pagamentoPeloMes)
})

rota.put("/pagamento/confirmacao",async (req,res)=>{
    const id = req.body.id;
    const pagou = req.body.pagou;
 

    const confirmacao =  await  Pagamento.confirmar(pagou,id)


})

rota.get("/pagamentos/data",async (req,res)=>{

    const pagamentoData = await Pagamento.pegarPorData()
    res.json(pagamentoData)
    
})
rota.post("/pagamento/idPag",async (req,res)=>{
    const id = req.body.idPagamento
    const pagamentoPorId = await Pagamento.pegarPorID(id);
    res.json(pagamentoPorId);
    // console.log(pagamentoPorId);
})



module.exports = rota