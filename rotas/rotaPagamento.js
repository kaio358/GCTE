const express = require("express")
const rota = express()

const Pagamento = require("../modelos/Pagamento")

rota.get("/pagamento/:id",async (req,res)=>{
    const id = req.params.id
    // const pagamentoValores = await Pagamento.valores(id)
    const pagamentoPeloMes = await Pagamento.pegarValorPorMesmaData(id)


    res.json(pagamentoPeloMes)
})

rota.put("/pagamento/confirmacao", async (req, res) => {
    const { id, pagou } = req.body; 

    
    if (!id || typeof pagou === 'undefined') {
        return res.status(400).json({ erro: "Campos 'id' e 'pagou' são obrigatórios." });
    }

    try {
        const resultado = await Pagamento.confirmar(pagou, id);
        res.status(200).json({ mensagem: "Pagamento atualizado com sucesso.", resultado });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao atualizar o pagamento." });
    }
});


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