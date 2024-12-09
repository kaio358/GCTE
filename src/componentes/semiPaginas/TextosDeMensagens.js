import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./TextosDeMensagens.module.css"

const caminho = process.env.REACT_APP_API_URL;

function TextosDeMensagens(){
    const localizacao = useLocation() 
    const idteste = localizacao.search;
    const numeroID = idteste.match(/\d+/)[0];

    const [pag,setPag] = useState()
    const [nome,setNome] =useState()
    const [data, setData] = useState()
    const [textosProntos, setTextosProntos] = useState(["Em espera" ,"Não pagou","Pagou"])


    useEffect(()=>{
        fetch(`${caminho}/pagamento/idPag`,{
                method: "POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify({
                    idPagamento: numeroID
                })
        })
        .then(resp => resp.json())
        .then(dados=>dados)
        .then(dados=>{
            const promises = dados.map(d => {
                setPag(Array.isArray(d)? d[0] : d)
                setData(Array.isArray(d)? new Date(d[0].data) : new Date(d.data))
                // console.log(Array.isArray(d)? d[0].pessoa_idpessoa : d.pessoa_idpessoa);
                return fetch(`${caminho}/pessoa/pagamento/nome`, {
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
        .then(dados=> setNome(Array.isArray(dados[0])? dados[0][0].nome: dados[0].nome))
        .catch(erro=> console.log(erro))
    },[])
   
    return(
        <div className={styles.divCentral}>
            <h1>O cliente </h1>
            <p>O cliente <span className={styles.destaqueTexto} > {nome ? nome : ''} {textosProntos[pag ? pag.confirmacao : 0]}  </span> a tarifa de <span className={styles.destaqueTexto}> {pag ? "R$"+ pag.valor : ''} </span> na data <span  className={styles.destaqueTexto}>{data ? data.getDate(): ""}/{data ?  data.getMonth()+1: ""}/{data ?  data.getFullYear(): ""} </span>.</p>
        </div>
    )
}

export default  TextosDeMensagens;