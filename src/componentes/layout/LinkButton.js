import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css'


function LinkButton({to,text}){
    return(
        <Link className={styles.btn} to={to} >
            <button>{text}</button>
        </Link>
    )
}

export default LinkButton