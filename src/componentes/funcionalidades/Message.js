import styles from "./Message.module.css"
function Message(props) {
    return(
        <li className={styles.message_c}>
            <div className={styles.foto_message}>
                <img src="https://placeholder.com/64"/>
            </div>
            <div className={styles.conteudo_message}>
                <span>{props.nome_user}</span>
                <span className={styles.importante_message}>{props.mensagem_pago_ou_nao}</span>
            </div>
            <div className={ ` ${styles.classificacao_message} ${styles[props.customCor]}` }>

            </div>
        </li>
    )
}
export default Message