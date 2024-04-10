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
        const sql = `SELECT  * FROM Pagamento WHERE Pessoa_idPessoa = ${id}`
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
    pegarPorID(id){
        const sql = `SELECT  * FROM Pagamento WHERE idPagamento = ${id}`
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
    pegarPorData(){
        const sql = `SELECT * FROM Pagamento WHERE DATE(data) <= DATE(CURRENT_DATE())`
        return new Promise((resolve, reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
    }
    pegarValorPorMesmaData(id){
        const sql = `SELECT * FROM Pagamento WHERE MONTH(data) = MONTH(CURRENT_DATE()) AND YEAR(data) = YEAR(CURRENT_DATE()) AND Pessoa_idPessoa = ${id}`
        return new Promise((resolve, reject)=>{
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
    }
    pegarPorDataENaoPagou(){
        const sql = `SELECT * FROM Pagamento WHERE DATE(data) < CURRENT_DATE() AND confirmacao = 1`
        return new Promise((resolve, reject)=>{
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
        const sql = `UPDATE Pagamento SET confirmacao = ${pagou} WHERE idPagamento = ${id}  AND MONTH(data) = MONTH(CURRENT_DATE()) 
        AND YEAR(data) = YEAR(CURRENT_DATE())`;

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
    atualizarValor(valor,id){
        const sql = `UPDATE Pagamento SET valor = ${valor} WHERE Pessoa_idPessoa = ${id}`

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
    atualizarDevedor(){
        const sql = `UPDATE Pagamento AS p1 JOIN (SELECT idPagamento FROM Pagamento WHERE DATE(data) < CURRENT_DATE() AND confirmacao = 0) AS p2 ON p1.idPagamento = p2.idPagamento SET p1.confirmacao = 1;`

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