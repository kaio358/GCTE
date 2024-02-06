
import { CiSearch } from "react-icons/ci";
import styles from "./BarraDeBusca.module.css"
import { useState } from "react";
function BarraDeBusca({buscaNomes}) {
    const [procuraNome, setProcuraNome] = useState()
    function escrevendo(event){
        setProcuraNome(event.target.value)
    }
    function procurar(){
      
        fetch(`http://localhost:5000/pessoa/nome/${procuraNome}/${2}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(resp=> resp.json())
        .then(dados=>buscaNomes(dados))
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