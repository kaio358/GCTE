
import { CiSearch } from "react-icons/ci";
import styles from "./BarraDeBusca.module.css"
function BarraDeBusca() {
    return(
        <div className={styles.caixaInputBarra}>
            <input type="text" className={styles.inputBarra}/>
            <div className={styles.iconInput}>
                <CiSearch/>
            </div>
        </div>
    )   
}
export default BarraDeBusca