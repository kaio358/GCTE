import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css'


function LinkButton({to,text,tipo}){
    return(
        <Link className={styles.btn} to={{pathname:to  ,state:{id:2}}} >
            <button type={tipo} > {text} </button>
        </Link>
    )
}

export default LinkButton