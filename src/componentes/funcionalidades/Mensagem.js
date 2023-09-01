import {ImCancelCircle} from "react-icons/im"

import styles from "./Mensagem.module.css"

function Mensagem(props){
    function fechar(e){
        const elemento_pai  = e.target.parentElement
        const elemento_main = elemento_pai.parentNode
       
        elemento_main.remove()
      
    }
    return(
        <main className={styles.corpo_mensagem}>
            <div className={styles.parte_superior_mensagem}>
                <h2 className={styles.titulo_msg}>Teste</h2>
                <ImCancelCircle className={styles.cancelar}   onClick={fechar}/>
            </div>
            <div className={styles.texto_mensagem}>
                {props.children}
            </div>
        </main>
    )
}

export default Mensagem