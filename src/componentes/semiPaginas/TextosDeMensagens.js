import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function TextosDeMensagens(){
    const localizacao = useLocation() 
    const idteste = localizacao.search;
    const numeroID = idteste.match(/\d+/)[0];

    const [pag,setPag] = useState()
    const [textosProntos, setTextosProntos] = useState(["Não pagou","Pagou"])

    useEffect(()=>{
        fetch("http://localhost:5000/pagamento/idPag",{
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
                // console.log(Array.isArray(d)? d[0].pessoa_idpessoa : d.pessoa_idpessoa);
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
        .then(dados=> console.log(dados))
    },[])

    return(
        <div>
            <h1>O cliente </h1>
            <p>Este cliente {textosProntos[0]} a tarifa de {pag ? pag.valor : ''} da data {pag ? pag.data: ''} </p>
        </div>
    )
}

export default  TextosDeMensagens;