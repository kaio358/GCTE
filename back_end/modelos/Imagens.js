const conexao = require('../infraestrutura/conexao')



class Imagens{
    adiciona( dados){
        const sql = 'INSERT INTO  Imagens SET ?'
        return new Promise((resolve,reject)=>{
            conexao.query(sql, dados,(erro, resultado)=>{
                if(erro) {
                    reject(erro)
                } else { 
                    resolve(resultado)
                }
            } )

        } )
    }
    lista(){
        const sql = 'SELECT * FROM  Imagens'
        return new Promise((resolve, reject)=>{

            conexao.query(sql, (erro, resultados) => { 
                if(erro) {
                    reject(erro)
                } else { 
                    
                    let valor=[]
                    let extensao = []
                    let id = []
                    for(let cont = 0; cont <resultados.length; cont++ ){
                        valor.push(resultados[cont].dados_imagens.toString('base64'))
                        extensao.push(resultados[cont].tipo)
                        id.push(resultados[cont].idImagens)
                    }
                    
                    resolve({id:id,imagens:valor,extensao:extensao})
                }
            })
        })
    }
    buscaPorId(id) {
        const sql = `SELECT * FROM  Imagens WHERE idImagens=${id}`;
        return new Promise((resolve,reject)=>{
            conexao.query(sql, (erro, resultados) => { 
                const imagem = resultados[0];
                if(erro) { 
                    reject(erro);
                } else {
                    const b64 = imagem.dados_imagens.toString('base64')
                    const tipo = imagem.tipo
                    const nome = imagem.nome
                    resolve({b64:b64,tipo:tipo,nome:nome});
                }
        
            })

        })
    }
    altera(id,valores){
        
        const sql = `UPDATE Imagens SET ? WHERE idImagens =${id}`
        return new Promise((resolve,reject )=>{
        
            conexao.query(sql,valores,(erro,resultados)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultados)
                }
            })
        
        
        } )
    }
    delete(id){
        const sql = `DELETE FROM Imagens WHERE idImagens=${id}`
        return new Promise((resolve,reject)=>{
            
            conexao.query(sql, (erro, resultados) => { 
                if(erro) {
                    reject(erro)
                } else { 
                    resolve({id})
                }
            })
        } )
    }
    conjuntoDeImagens(id){
        const sql = `SELECT * FROM  Imagens WHERE Escola_idEscola=${id}`;
        return new Promise((resolve,reject)=>{
            
            conexao.query(sql, (erro, resultados) => { 
                // let imageArray = []
                if(erro) { 
                    reject(erro);
                } else {
                    // for(let valor of resultados){
                    //     imageArray.push( `data:${valor.tipo};base64,${valor.dados_imagens.toString('base64')}`)
                    // }
    
                    // resolve({image:imageArray});
                    resolve(resultados)
                }
        
            })
        } )
    }
}

module.exports = new Imagens