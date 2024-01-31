
import { CiSearch } from "react-icons/ci";
import styles from "./BarraDeBusca.module.css"
import { useState } from "react";
function BarraDeBusca() {
    const [procuraNome, setProcuraNome] = useState()
    function escrevendo(event){
        console.log(event.target.value);
        setProcuraNome(event.target.value)
    }
    function procurar(){
        console.log(procuraNome);
        fetch(`http://localhost:5000/pessoa/nome/${procuraNome}/${2}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(resp=> resp.json())
        .then(dados=>console.log(dados))
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