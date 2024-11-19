const express = require("express")
const rota = express()

const Pessoa = require("../modelos/Pessoa")
const Escola = require("../modelos/Escola")
const Pagamento = require("../modelos/Pagamento")

// talvez essa rota não use mais
rota.get("/pessoa/escola/:idEscola",async (req,res)=>{
    const id =  req.params.idEscola
    const lista_pessoas = await Pessoa.lista(id)
    const nomeEscola = await Escola.pegaNomeEscola(id)
 
 
    res.json({pessoa: lista_pessoas,escola:  nomeEscola})
})

rota.get("/pessoa/nome/:nome/:id",async(req,res)=>{
    const nome = req.params.nome
    const id = req.params.id

    const nomePessoas = await Pessoa.nomeLista(nome,id)
    const nomeEscola = await Escola.pegaNomeEscola(id)
    res.json({pessoa: nomePessoas,escola:  nomeEscola})
})



rota.post("/pessoa/pagamento/nome",async(req,res)=>{
    
    const idPessoa = req.body.idPessoa
    const nomePessoa = await Pessoa.pegarNome(idPessoa)
    res.json(nomePessoa)
   
})

rota.post("/pessoa/inserir",async (req,res)=>{
    const dados = req.body
    const anoData = new Date()

    const adicionaPessoa = await Pessoa.adiciona({nome:dados.nome,endereco:dados.endereco,telefone:dados.telefone,Escola_idEscola: dados.idEscola})
    for(let i = 0 ; i < dados.parcelas; i++){
       
        let totalMes = parseInt( dados.mes)+ i;
        if (totalMes >= 12 ){
            dados.mes =  (-i) 
   
        }


        
    const data = (`${anoData.getFullYear()}/${totalMes}/${dados.dias}`)
    
    const adicionaPreco = await Pagamento.adiciona({valor:dados.valor, data:data,confirmacao:0,Pessoa_idPessoa:adicionaPessoa.insertId})
    }

})

//  atualiza usuario 
rota.put("/pessoa/atualizar", async (req,res)=>{
    const dados = req.body.dados
    const id = req.body.id
    const valor = req.body.valor

    if(dados){
        
        const pessoaAtualizada = await Pessoa.atualizar(dados,id)
        console.log("Pessoa atualizada : ", pessoaAtualizada);

    }
    if(valor){
        const pagamentoAtualizado = await Pagamento.atualizarValor(valor,id)     
        console.log("Pagamento atualizado : ", pagamentoAtualizado);

    }
    
   
})




module.exports = rota