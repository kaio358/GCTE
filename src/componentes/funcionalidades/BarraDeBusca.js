
import { CiSearch } from "react-icons/ci";
import styles from "./BarraDeBusca.module.css"
function BarraDeBusca() {
    function procurar(){
        fetch(`http://localhost:5000/pessoa/nome/${"seila"}`,{
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
            <input type="text" className={styles.inputBarra}/>
            <button className={styles.iconInput} onClick={procurar}>
                <CiSearch/>
            </button>
        </div>
    )   
}
export default BarraDeBusca