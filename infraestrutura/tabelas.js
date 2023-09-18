

class Tabelas{
    init(conexao){
        this.conexao = conexao
       
        this.criarEscola()
        this.criarPagamento()
        this.criarPessoa()
        

    }
    criarEscola(){
        const sql = `CREATE TABLE IF NOT EXISTS Escola (idEscola INT NOT NULL AUTO_INCREMENT, nome VARCHAR(255) NULL,horario TIME NULL,PRIMARY KEY (idEscola))`
        this.conexao.query(sql,erro=>{
            if(erro){
                console.log(erro);
            }else{
                console.log("Tabela Escola criada");
            }
        })
    }
    criarPagamento(){
        const sql = `CREATE TABLE IF NOT EXISTS Pagamento (idpagamento INT NOT NULL,valor REAL NULL,data DATE NULL,PRIMARY KEY (idpagamento))`
        this.conexao.query(sql,erro=>{
            if(erro){
                console.log(erro);
            }else{
                console.log("Tabela Pagamento criada");
            }
        })
      
    }
    criarPessoa(){
        const sql = `CREATE TABLE IF NOT EXISTS Pessoa ( 
        idpessoa INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        endereco VARCHAR(100) NULL,
        telefone VARCHAR(15) NULL,
        pagamento_idpagamento INT NOT NULL,
        Escola_idEscola INT NOT NULL,
        PRIMARY KEY (idpessoa),
        INDEX fk_pessoa_pagamento_idx (pagamento_idpagamento ASC) VISIBLE,
        INDEX fk_Pessoa_Escola1_idx (Escola_idEscola ASC) VISIBLE,
        CONSTRAINT fk_pessoa_pagamento
          FOREIGN KEY (pagamento_idpagamento)
          REFERENCES Pagamento (idpagamento)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_Pessoa_Escola1
          FOREIGN KEY (Escola_idEscola)
          REFERENCES Escola (idEscola)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`
        this.conexao.query(sql,erro=>{
            if(erro){
                console.log(erro);
            }else{
                console.log("Tabela Pessoa criada");
            }
        })
      
    }
}
module.exports = new Tabelas