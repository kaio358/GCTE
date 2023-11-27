import Message from "../funcionalidades/Message"
import styles from "./CaixaDeMensagem.module.css"
function CaixaDeMensagem() {
    return(
        <div>
            <section>
                <ul>
                    <li>Geral</li>
                    <li>Importante</li>
                </ul>
                <div>
                    lido
                </div>
            </section>
            <section className={styles.box_message}>
                <ul>
                    <Message customCor={"corVer"}/>
                </ul>
            </section>
        </div>
    )
}

export default CaixaDeMensagem