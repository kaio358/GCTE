
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Tabela.module.css"
import BarraDeBusca from "../funcionalidades/BarraDeBusca";
import Linha_tabela from "../layout/Linha_tabela";

import icon_papel from "../../imgs/icons/folha-de-papel.png"
import AbaInputClientes from "../funcionalidades/AbaInputClientes";

function Tabela(){
    const localizacao = useLocation() 

    const idteste = localizacao.search;
    const ourNumber = idteste.match(/\d+/)[0];




    const [pessoas,setPessoa] = useState()
    const [valor,setValor] = useState()


    const [abaPapel, setAbaPapel] = useState(false)


    useEffect(() => {
        fetch(`http://localhost:5000/pessoa/escola/${ourNumber}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(resp => resp.json())
          .then(dados => {
            setPessoa(dados);
            return dados;
          })
          .then(dados => {
            const promises = dados.pessoa.map(p => {
              return fetch(`http://localhost:5000/pagamento/${p.idpessoa}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(resp => resp.json());
            });
            return Promise.all(promises);
          })
          .then(dados => {
            const arraySemVazias = dados.filter(subarray => subarray.length > 0);
            setValor(arraySemVazias);
          })
          .catch(erro => console.log(erro));
      }, []);
    function buscaNome(novo){
      setPessoa(novo)
    }
    
    function abrirAba() {
      
        if(!abaPapel){
          setAbaPapel(true)
        }else{
          setAbaPapel(false)
        }
    }

  
    return(
        <div className={styles.divTab}>
            <h1>Tabela</h1>
            <div className={styles.parteSuperiorTabela}>
              <BarraDeBusca buscaNomes={buscaNome} />
              <div className={styles.icon_ger} onClick={abrirAba}  >
                <img src={icon_papel}  />
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
        
                   
             
                    {pessoas? pessoas.pessoa.map((p,i)=>{        
                            
                        return pessoas.escola.map(e=>{

                          if(valor) {
                            return <Linha_tabela id={ p.idpessoa} nome={p.nome} escola={e.nome} endereco={p.endereco} telefone={p.telefone} valorPago={valor[0][0].valor}/>   
                   
                          }else{
                            return <Linha_tabela id={ p.idpessoa} nome={p.nome} escola={e.nome} endereco={p.endereco} telefone={p.telefone} />   
                          }
                        })
                       
                    }) : ""}
                </tbody>
               
            </table>
        </div>
    )
}
export default Tabela
