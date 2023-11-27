import styles from "./Message.module.css"
function Message(props) {
    return(
        <li className={styles.message_c}>
            <div className={styles.foto_message}>
                <img src=""/>
            </div>
            <div className={styles.conteudo_message}>
                <span>Nome</span>
                <span>Pagou</span>
            </div>
            <div className={ ` ${styles.classificacao_message} ${styles[props.customCor]}` }>

            </div>
        </li>
    )
}
export default Message