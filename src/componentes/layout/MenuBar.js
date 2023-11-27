import {Link} from 'react-router-dom'
import {HiGift} from 'react-icons/hi2'
import styles from './MenuBar.module.css'

function MenuBar(){
    return(
        <nav className={styles.containerMenu}>
            <div>
                {<HiGift className={styles.iconPresente}/>}
            </div>
            <ul className={styles.lista_nav}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/gerenciar">Gerenciar</Link></li>
                <li><Link to="/mensagens">Mensagens</Link></li>
            </ul>            
        </nav>
    )
}
export default MenuBar