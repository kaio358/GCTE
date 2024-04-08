import { useState,useEffect } from "react"
import { Link } from "react-router-dom"


import Message from "../funcionalidades/Message"
import styles from "./CaixaDeMensagem.module.css"




function CaixaDeMensagem() {
 
    const [dadosPagamento , setDadosPagamento] = useState()
    const [nomesPag, setNomesPag] = useState()
    const [mensagensPag, setMensagensPag] = useState()
    useEffect(()=>{
     
        fetch("http://localhost:5000/pagamentos/data",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(resp => resp.json())
        .then(dados => {
         
            setDadosPagamento(dados)
            return dados
        } )
        .then( dados =>{
            const promises = dados.map(d => {
                
                return fetch(`http://localhost:5000/pessoa/pagamento/nome`, {
                  method: 'POST',
                  body: JSON.stringify({
                    idPessoa: d.pessoa_idpessoa
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
    // console.log(nomesPag);
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

    function confirLido(idPag) {
        fetch("http://localhost:5000/mensagemConfirmarLida",{
            method:"POST",
            body: JSON.stringify({
                idPagamento: idPag
            }),
            headers:{'Content-Type':'application/json'}
        }).then(resp=>resp.json())
    }
    return(
        <div className={styles.div_caixa_mensagem}>

            <section>
                <ul className={styles.guia_caixa_de_mensagem}>
                    <li><Link to="/mensagens/geral" className={`${styles.link_li} ${styles.posicaoAtual}`}>Geral</Link> </li>
                    <li><Link to="/mensagens/importante" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Importante </Link></li>
                    <li><Link to="/mensagens/lida" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Lida(s)</Link></li>
                </ul>
                
         
            </section>
            <section className={styles.box_message}>
                <ul>
                 
                   
                 
            
                    {/* <Message nome_user={"Kaio Luiz Ferreira"} customCor={"corVer"} mensagem_pago_ou_nao={"Não pagou"}/>
                    <Message nome_user={"Maria Eduarda"} customCor={"corGreen"} mensagem_pago_ou_nao={"Pagou"}/>
                    <Message nome_user={"Fernando"} customCor={"corGreen"} mensagem_pago_ou_nao={"Pagou"}/> */}

                    {nomesPag ?
                        nomesPag.map((n,i)=>{
                          
                            if(n.length>1 && nomesPag.length <= 1){

                                return <Link to={`/textoMensagem?${dadosPagamento[i][0].idPagamento ? dadosPagamento[i][0].idPagamento : dadosPagamento[i].idPagamento}`} ><Message  nome_user={n[i].nome} customCor={mensagensPag[i].cor} mensagem_pago_ou_nao={mensagensPag[i].pagou} onClick={confirLido(dadosPagamento[i][0].idPagamento ? dadosPagamento[i][0].idPagamento : dadosPagamento[i].idPagamento)}/></Link> 
                            }else{
                        
                                return <Link  to={`/textoMensagem?${dadosPagamento[i].idPagamento}`} ><Message nome_user={n[0].nome} customCor={mensagensPag[i].cor} mensagem_pago_ou_nao={mensagensPag[i].pagou} onClick={confirLido(dadosPagamento[i].idPagamento)}/> </Link> 
                            }
                        })
                     :''}
                </ul>
            </section>
        </div>
    )
}

export default CaixaDeMensagem