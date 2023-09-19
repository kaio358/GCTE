const conexao = require("../infraestrutura/conexao")

class Escola{
    init(){
        this.id = null;
        this.nome = "";
        this.horario = 0;
    }
  
    lista(){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Escola`
            conexao.query(sql,(erro,resultado)=>{
                if(erro){
                    reject(erro);
                }else{
        
                    resolve(resultado);
                }
            })
        })
    }
    adiciona(dados){
        const sql = `INSERT INTO Escola set ?`
        conexao.query(sql,dados,(erro,resultado)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log(resultado);
            }
        })
    }
    deleta(id){
        const sql = `DELETE FROM Escola WHERE idEscola = ${id}`
        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log(resultado);
            }
        })
    }
    
}
module.exports = new Escola