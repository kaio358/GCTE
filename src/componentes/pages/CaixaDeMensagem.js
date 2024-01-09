import { useState } from "react"
import Message from "../funcionalidades/Message"
import styles from "./CaixaDeMensagem.module.css"
function CaixaDeMensagem() {
    const [teste , setTeste] = useState()
    return(
        <div className={styles.div_caixa_mensagem}>

            <section>
                <ul className={styles.guia_caixa_de_mensagem}>
                    <li>Geral</li>
                    <li>Importante</li>
                    <li>Lido(s)</li>
                </ul>
               
            </section>
            <section className={styles.box_message}>
                <ul>
                    <Message nome_user={"Kaio Luiz Ferreira"} customCor={"corVer"} mensagem_pago_ou_nao={"Não pagou"}/>
                    <Message nome_user={"Maria Eduarda"} customCor={"corGreen"} mensagem_pago_ou_nao={"Pagou"}/>
                    <Message nome_user={"Fernando"} customCor={"corGreen"} mensagem_pago_ou_nao={"Pagou"}/>
                </ul>
            </section>
        </div>
    )
}

export default CaixaDeMensagem