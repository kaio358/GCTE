const conexao = require("../infraestrutura/conexao")

class Escola{
    init(){
        this.id = null;
        this.nome = "";
        this.horario = 0;
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