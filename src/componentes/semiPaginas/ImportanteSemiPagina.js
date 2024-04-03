import { useEffect, useState } from "react"
import styles from "../pages/CaixaDeMensagem.module.css"
// import estilo from "./ImportanteSemiPagina.module.css"

import Message from "../funcionalidades/Message"
import { Link } from "react-router-dom"

function ImportanteSemiPagina(){
    const [dadosPagamento , setDadosPagamento] = useState()
    const [nomesPag, setNomesPag] = useState()
    const [mensagensPag, setMensagensPag] = useState()

    useEffect(()=>{
      
        fetch("http://localhost:5000/mensagensImportantes",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(resp => resp.json())
        .then(dados=>{

            return dados
        })
        .then(dados=>{
            
            const promises = dados.map(d=>{
                
                return fetch("http://localhost:5000/pagamento/idPag",{
                    method: "POST",
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body: JSON.stringify({
                        idPagamento: d.Pagamento_idPagamento
                    })
                }).then(resp => resp.json());
            })
            return Promise.all(promises);
        })
        .then(dados=>{
            setDadosPagamento(dados)
            return dados
        })
        .then(dados=>{
            // console.log(dados);
            const promises = dados.map(d => {
              
                return fetch(`http://localhost:5000/pessoa/pagamento/nome`, {
                  method: 'POST',
                  body: JSON.stringify({
                    idPessoa: Array.isArray(d)? d[0].pessoa_idpessoa : d.pessoa_idpessoa
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(resp => resp.json());
            });
            return Promise.all(promises);
        })
        .then(dados => setNomesPag(dados))
        .catch(erro => console.log(erro))
    },[])

    useEffect(()=>{
        if(dadosPagamento){
            
            const arrayDados =  dadosPagamento.map(dp =>{
                if(dp.confirmacao == 2){
                    return {cor:"corGreen", pagou:"Pagou"}
                }else{
                    return {cor:"corVer", pagou:"Não pagou"}
                }
            })
            setMensagensPag(arrayDados)
            
        }
    },[dadosPagamento])
  
    return(
        <div className={styles.div_caixa_mensagem}>
            <h1>Importante (s)</h1>
            
            <section>
                <ul className={styles.guia_caixa_de_mensagem}>
                    <li><Link to="/mensagens/geral" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Geral</Link> </li>
                    <li><Link to="/mensagens/importante" className={`${styles.link_li} ${styles.posicaoAtual}`}>Importante </Link></li>
                    <li><Link to="/mensagens/lida" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Lida(s)</Link></li>
                </ul>
                
         
            </section>
            <section className={styles.box_message}>
                {nomesPag ?
                
                    nomesPag.map((n,i)=>{
                        if(n.length>1 && nomesPag.length <= 1){
                            return <Link to={`/textoMensagem?${dadosPagamento[i].idPagamento}`}> <Message  nome_user={n[i].nome} customCor={mensagensPag[i].cor} mensagem_pago_ou_nao={mensagensPag[i].pagou}/> </Link>
                        }else{
                            return  <Link to={`/textoMensagem?${dadosPagamento[i].idPagamento}`}><Message nome_user={n[0].nome} customCor={mensagensPag[i].cor} mensagem_pago_ou_nao={mensagensPag[i].pagou}/> </Link>
                        }
                        })
                    :''}
            </section>
        </div>
    )
}
export default ImportanteSemiPagina