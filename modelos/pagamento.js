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
        const sql = `SELECT  idpagamento,valor,confirmacao FROM Pagamento WHERE Pessoa_idPessoa = ${id}`
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
    adiciona(dados){
        const sql = `INSERT INTO Pagamento set ?`;
        return new Promise((resolve,reject)=>{
            conexao.query(sql,dados,(erro,resultado)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
    }
    confirmar(pagou,id){
        // const sql = `UPDATE Pagamento (confirmacao) VALUES (${pagou}) WHERE idPagamento = ${id}`
        const sql = `UPDATE Pagamento SET confirmacao = ${pagou} WHERE idPagamento = ${id}`;

        return new Promise((resolve,reject )=>{
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