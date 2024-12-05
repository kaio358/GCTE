
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import styles from "./BarraDeBusca.module.css"
import { useState } from "react";
function BarraDeBusca({buscaNomes}) {

    const localizacao = useLocation() 

    const idteste = localizacao.search;
    const ourNumber = idteste.match(/\d+/)[0];

    const [procuraNome, setProcuraNome] = useState()
    function escrevendo(event){
        setProcuraNome(event.target.value)
    }
    function procurar(){
     
        
        fetch(`http://GCTE-LoadBalancer-2114462684.us-east-1.elb.amazonaws.com/dadosDeBusca`,{
            method:"POST", 
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify({
                idEscola:ourNumber,
                nome:procuraNome
            })
        })
        .then(resp=>resp.json())
        .then(dados=>{
            console.log(dados);
            buscaNomes(dados)
            
        })
        
    }

    return(
        <div className={styles.caixaInputBarra}>
            <input type="text" className={styles.inputBarra} onChange={escrevendo}/>
            <button className={styles.iconInput} onClick={procurar}>
                <CiSearch/>
            </button>
        </div>
    )   
}
export default BarraDeBusca