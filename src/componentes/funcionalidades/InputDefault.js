import styles from "./InputDefault.module.css"

function InputDefault(props){
 
    function mudarTexto(e){
            props.texto(e.target.value)

    }
    
    return(
        <input type='text' value={props.valor} onChange={mudarTexto} placeholder={props.tipo} className={styles.inputDefaultEstilo}/>
    )
}
export default InputDefault