const conexao = require("../infraestrutura/conexao")


class Pessoa{
    lista(id){
        const sql = `Select * from Pessoa WHERE Escola_idEscola = ${id}`

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


module.exports = new Pessoa