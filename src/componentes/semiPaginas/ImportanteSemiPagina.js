import styles from "../pages/CaixaDeMensagem.module.css"
// import estilo from "./ImportanteSemiPagina.module.css"

import { Link } from "react-router-dom"

function ImportanteSemiPagina(){
    return(
        <div className={styles.div_caixa_mensagem}>
            <h1>Importante (s)</h1>
            
            <section>
                <ul className={styles.guia_caixa_de_mensagem}>
                    <li><Link to="/mensagens/geral" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Geral</Link> </li>
                    <li><Link to="/mensagens/importante" className={`${styles.link_li} ${styles.posicaoAtual}`}>Importante </Link></li>
                    <li><Link to="/mensagens/lida" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Lida(s)</Link></li>
                </ul>
                
         
            </section>
            <section className={styles.box_message}>

            </section>
        </div>
    )
}
export default ImportanteSemiPagina