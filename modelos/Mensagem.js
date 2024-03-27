const conexao = require("../infraestrutura/conexao")

class Mensagem{
    lista(){
        const sql = `SELECT * FROM Mensagem`
        return new Promise ((resolve, reject)=>{

            conexao.query(sql,(erro, resultado)=>{
                if(erro){
                    reject(erro);
                }else{
                    resolve(resultado);
                }
            })
        })
    }
    lidas(){
        const sql = `SELECT * FROM Mensagem WHERE leram = 1`

        return new Promise((resolve,reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro);
                }else{
                    resolve(resultado);
                }
            })
        })

    }
    importantes(){
        const sql = `SELECT * FROM Mensagem WHERE importante = 1`

        return new Promise((resolve,reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro);
                }else{
                    resolve(resultado);
                }
            })
        })
    }
    pegaPeloIDPagamento(id){
        const sql = `SELECT * FROM Mensagem WHERE Pagamento_IdPagamento = ${id}`

        return new Promise((resolve,reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro);
                }else{
                    resolve(resultado);
                }
            })
        })
 
    }
    adiciona(){
        const sql = `INSERT INTO Mensagem set ?`

        return new Promise((resolve,reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro);
                }else{
                    resolve(resultado);
                }
            })
        })

    }
    atualizaOuInseriImportante(idPag){

        // const sql = `UPDATE Mensagem set importante = ${imp} WHERE Pagamento_idPagamento = ${idPag} `
        const sql = `INSERT INTO Mensagem (Pagamento_idPagamento, importante,leram) values (1,1,0) ON DUPLICATE KEY UPDATE importante = 1; `
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

module.exports = new Mensagem