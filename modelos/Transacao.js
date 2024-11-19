const conexao = require('../infraestrutura/conexao');

class Transacao {

    pegarValores(idEscola) {
        const sqlPessoas = `SELECT * FROM Pessoa WHERE Escola_idEscola = ?`;
        const sqlEscola = `SELECT nome,idEscola FROM Escola Where idEscola=?`

        return new Promise((resolve, reject) => {
            conexao.beginTransaction(async (err) => {
                if (err) return reject(err);

                try {
                    // Buscar todas as pessoas
                    const pessoas = await this.executarQuery(sqlPessoas, [idEscola]);
                  
                    const escola = await this.executarQuery(sqlEscola,[idEscola])
                    
                    // Buscar os pagamentos associados para cada pessoa
                    const pessoasComPagamentos = [];
                    for (const pessoa of pessoas) {
                        // console.log(pessoa);
                        
                        const sqlPagamentos = `SELECT * FROM Pagamento WHERE Pessoa_idPessoa = ?  AND MONTH(data) = MONTH(CURRENT_DATE()) AND YEAR(data) = YEAR(CURRENT_DATE())`;
                        const pagamentos = await this.executarQuery(sqlPagamentos, [pessoa.idpessoa]);
                        

                        // Consolidar os dados da pessoa com seus pagamentos
                        pessoasComPagamentos.push({
                            pessoa,
                            escola,
                            pagamentos,
                        });
                    }

                    // Commit da transação
                    conexao.commit((commitErr) => {
                        if (commitErr) return conexao.rollback(() => reject(commitErr));

                        resolve(pessoasComPagamentos);
                    });
                } catch (error) {
                    conexao.rollback(() => reject(error));
                }
            });
        });
    }

    



    // Função utilitária para executar queries com Promises
    executarQuery(sql, params) {
        return new Promise((resolve, reject) => {
            conexao.query(sql, params, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

module.exports = new Transacao();
