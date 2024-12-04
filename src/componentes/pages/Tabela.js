
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Tabela.module.css"
import BarraDeBusca from "../funcionalidades/BarraDeBusca";
import Linha_tabela from "../layout/Linha_tabela";

import icon_papel from "../../imgs/icons/folha-de-papel.png"
import icon_lapis from "../../imgs/icons/lapis.png"
import AbaInputClientes from "../funcionalidades/AbaInputClientes";

function Tabela(){
    const localizacao = useLocation() 

    const idteste = localizacao.search;
    const ourNumber = idteste.match(/\d+/)[0];

    const [pessoas,setPessoa] = useState()
  
    const [abaPapel, setAbaPapel] = useState(false)
    const [abaLapis, setAbaLapis] = useState(false)


    useEffect(() => {
      // console.log(ourNumber);
      
      fetch(`http://ec2-3-86-103-43.compute-1.amazonaws.com:5000/pegarValores/${ourNumber}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp=>resp.json())
      .then(dados=> setPessoa(dados))
    
          
      }, []);
 
    function buscaNome(novo){
      // console.log(novo);
      
      setPessoa(novo)
    }
    
    function abrirAba() {
      
        if(!abaPapel){
          setAbaPapel(true)
        }else{
          setAbaPapel(false)
        }
    }

    function modifcarValores(){
        if(!abaLapis){
          setAbaLapis(true)
        }else{
          setAbaLapis(false)
        }
      
    }
  
  
    return(
        <div className={styles.divTab}>
            <h1>Tabela</h1>
            <div className={styles.parteSuperiorTabela}>
              <BarraDeBusca buscaNomes={buscaNome} />
              <div className={styles.icones_mod}>
                <div className={styles.icon_ger} onClick={modifcarValores} >
                  <img src={icon_lapis}/>
                </div>
                <div className={styles.icon_ger} onClick={abrirAba}  >
                  <img src={icon_papel}  />
          
                </div>
              
              </div>

            </div>
            { abaPapel? <AbaInputClientes fecharAbaInput={abrirAba} idTabela={ourNumber}/>:""}
            
            <table  className={styles.tabela_estilo}>
                <thead className={styles.tabela_head}>
                    <tr>
                        
                        <th>ID</th>
                        <th>Nome</th>
                        <th  coLSpan="2">Escola</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Preço</th>
                        <th className={styles.anEsp}>Pagou</th>
                    </tr>
                </thead>
                <tbody>
                      {pessoas? pessoas.map((p,i)=>{        
                        // console.log(p);
                        
                          
                                                     
                          const linhaProps = {
                              id: p.pessoa.idpessoa,
                              nome: p.pessoa.nome,
                              escola: Array.isArray(p.escola) ? p.escola[0].nome : p.escola.nome,
                              endereco: p.pessoa.endereco,
                              telefone: p.pessoa.telefone,
                              eventoLapis: abaLapis,
                              valorPago: p.pagamentos[0].valor ,
                              idPagamento: p.pagamentos[0].idpagamento,
                              confirmacao:  p.pagamentos[0].confirmacao == null ? 0 :  p.pagamentos[0].confirmacao
                          };
                  
                  
                          return  <Linha_tabela {...linhaProps} key={p.pessoa.idpessoa} /> ;
                              
                              
                      
                          
                          
                      }) : ""}
                   
             
                   

                </tbody>
               
            </table>
        </div>
    )
}




export default Tabela
