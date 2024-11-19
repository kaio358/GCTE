
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
    const [valor,setValor] = useState()

    const [idpessoa, setIDPessoa] = useState()

    const [abaPapel, setAbaPapel] = useState(false)
    const [abaLapis, setAbaLapis] = useState(false)


    useEffect(() => {
      fetch(`http://localhost:5000/teste`,{
        method:'POST',
        body: JSON.stringify({
          idEscola:ourNumber
        })
      })
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
                // Verifica se os dados estão em um formato de matriz de matrizes
              if (Array.isArray(dados) && dados.length > 0 && Array.isArray(dados[0])) {
                // Se sim, transforma em uma única matriz
                const newData = dados.flat(); // Use flat() para transformar em uma única matriz
               
                setValor(newData);
                  
              } else {
                  console.log('Os dados não estão no formato esperado.');
                  // Trate o caso em que os dados não estão no formato esperado
              }
         
          })
          .catch(erro => console.log(erro));
          
      }, []);
      useEffect(()=>{
    
          if(valor){
            const objetoIDPessoa = valor.map(obj=>obj.pessoa_idpessoa)
            setIDPessoa(objetoIDPessoa)
          }
  
          
        },[valor]);
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

    function modifcarValores(){
        if(!abaLapis){
          setAbaLapis(true)
        }else{
          setAbaLapis(false)
        }
      
    }
    // console.log(valor, " Oi "+ atualMesValor, "Ola "+ confirmacao);
  
  
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
                      {pessoas? pessoas.pessoa.map((p,i)=>{        
                          
                          return pessoas.escola.map((e)=>{
                            
                              const linhaProps = {
                                  id: p.idpessoa,
                                  nome: p.nome,
                                  escola: e.nome,
                                  endereco: p.endereco,
                                  telefone: p.telefone,
                                  eventoLapis: abaLapis,
                                  // idPagamento: atualMesValor && i < atualMesValor.length ? atualMesValor[i].idPagamento : 0
                              };
                      
                              if (valor) {
                              
                                
                                  // const valorPago = valor[0]?.length > 1 && valor.length <= 1 ? valor[0][i].valor :  (valor.length > 1) ? valor[i].valor : valor[i][0].valor;
                                  const valorPago = idpessoa?.includes(p.idpessoa)  ? valor[idpessoa.indexOf(p.idpessoa)].valor : 0;;
                                  const confirmacaoValor = idpessoa?.includes(p.idpessoa)  ? valor[idpessoa.indexOf(p.idpessoa)].confirmacao : 0;
                                  linhaProps.valorPago = valorPago;
                                  linhaProps.confirmacao = confirmacaoValor;
                                  linhaProps.idPagamento =  i<valor.length ? valor[i].idPagamento : 0;
                              }
                      
                              return  idpessoa?.includes(p.idpessoa) ? <Linha_tabela {...linhaProps} /> : '';
                              
                              
                      
                          })
                          
                      }) : ""}
                   
             
                    {/* {pessoas && pessoas.pessoa.map((pessoa) => {
                          
                          const escola = pessoas.escola?.find((e) => e.id === pessoa.escola_id);

                       
                          const linhaProps = {
                              id: pessoa.idpessoa,
                              nome: pessoa.nome,
                              escola: escola?.nome || "Não encontrada",
                              endereco: pessoa.endereco,
                              telefone: pessoa.telefone,
                              eventoLapis: abaLapis,
                              valorPago: 0,
                              confirmacao: 0,
                              idPagamento: null,
                          };

                          
                          if (valor && idpessoa?.includes(pessoa.idpessoa)) {
                              const index = idpessoa.indexOf(pessoa.idpessoa);
                              if (index >= 0 && valor[index]) {
                                  linhaProps.valorPago = valor[index].valor || 0;
                                  linhaProps.confirmacao = valor[index].confirmacao || 0;
                                  linhaProps.idPagamento = valor[index].idPagamento || null;
                              }
                          }

                          // Retorne a linha da tabela apenas se houver correspondência válida
                          return <Linha_tabela key={pessoa.idpessoa} {...linhaProps} />;
                      })} */}

                </tbody>
               
            </table>
        </div>
    )
}




export default Tabela
