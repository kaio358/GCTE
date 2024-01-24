const conexao = require("../infraestrutura/conexao")

class Pagamento{
    lista(){
        const sql = `SELECT * FROM Pagamento`
        return new Promise ((resolve, reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
    }   
    valores(id){
        const sql = `SELECT  idpagamento,valor FROM Pagamento WHERE Pessoa_idPessoa = ${id}`
        return new Promise((resolve,reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
    } 
}

module.exports = new Pagamento