

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
        const sql = `CREATE TABLE IF NOT EXISTS Pagamento
        (  
            idpagamento INT NOT NULL,
            pessoa_idpessoa INT NOT NULL,
            valor REAL NULL,
            data DATE NULL,
            PRIMARY KEY (idpagamento), 
            INDEX fk_Pagamento_Pessoa1_idx (pessoa_idpessoa ASC) VISIBLE,
            CONSTRAINT fk_Pagamento_Pessoa1
              FOREIGN KEY (pessoa_idpessoa)
              REFERENCES Pessoa (idpessoa)
        )`
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
      
        Escola_idEscola INT NOT NULL,
        PRIMARY KEY (idpessoa),
      
        INDEX fk_Pessoa_Escola1_idx (Escola_idEscola ASC) VISIBLE,
        CONSTRAINT fk_Pessoa_Escola1
          FOREIGN KEY (Escola_idEscola)
          REFERENCES Escola (idEscola)
          )`
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