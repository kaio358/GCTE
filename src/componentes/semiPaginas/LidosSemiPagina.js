import { useEffect, useState } from "react"


import styles from "../pages/CaixaDeMensagem.module.css"
// import estilo from "./ImportanteSemiPagina.module.css"
import Message from "../funcionalidades/Message"
import { Link } from "react-router-dom"

function LidoSemiPagina(){

    const [dadosPagamento , setDadosPagamento] = useState()
    const [nomesPag, setNomesPag] = useState()
    const [mensagensPag, setMensagensPag] = useState()

    useEffect(()=>{
      
        fetch("http://ec2-44-201-229-29.compute-1.amazonaws.com:5000/mensagensLidas",{
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
                
                return fetch("http://ec2-44-201-229-29.compute-1.amazonaws.com:5000/pagamento/idPag",{
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
        .then(dados => {
            // Verifica se os dados estão em um formato de matriz de matrizes
            if (Array.isArray(dados) && dados.length > 0 && Array.isArray(dados[0])) {
                // Se sim, transforma em uma única matriz
                const newData = dados.flat(); // Use flat() para transformar em uma única matriz
                setDadosPagamento(newData);
                
            } else {
                console.log('Os dados não estão no formato esperado.');
                // Trate o caso em que os dados não estão no formato esperado
            }
            return dados
        })
      
        .then(dados=>{
            // console.log(dados);
            const promises = dados.map(d => {
              
                return fetch(`http://ec2-44-201-229-29.compute-1.amazonaws.com:5000/pessoa/pagamento/nome`, {
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
          
            const arrayDados =   dadosPagamento.map(dp =>{
         
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
        <h1>Lido(s)</h1>
        
        <section>
            <ul className={styles.guia_caixa_de_mensagem}>
                <li><Link to="/mensagens/geral" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Geral</Link> </li>
                <li><Link to="/mensagens/importante"  className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Importante </Link></li>
                <li><Link to="/mensagens/lida"  className={`${styles.link_li} ${styles.posicaoAtual}`}>Lida(s)</Link></li>
            </ul>
            
     
        </section>
        <section className={styles.box_message}>
            {nomesPag ?
                 
                    nomesPag.map((n,i)=>{
                    
                       if(n.length>1 && nomesPag.length <= 1){

                           return <Link to={`/textoMensagem?${dadosPagamento[i].idPagamento}`} className={styles.link_li}> <Message  nome_user={n[i].nome} customCor={mensagensPag[i].cor} mensagem_pago_ou_nao={mensagensPag[i].pagou}/> </Link>
                       }else{
                          
                           return  <Link to={`/textoMensagem?${dadosPagamento[i].idPagamento}`} className={styles.link_li}><Message nome_user={n[0].nome} customCor={mensagensPag[i].cor} mensagem_pago_ou_nao={mensagensPag[i].pagou}/> </Link>
                       }
                       })
                    :''}
        </section>
    </div>
    )
}
export default LidoSemiPagina