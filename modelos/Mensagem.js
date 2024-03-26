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
    atualizaImportante(imp,idPag){

        const sql = `UPDATE Mensagem set importante = ${imp} WHERE Pagamento_idPagamento = ${idPag} `
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