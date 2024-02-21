import styles from "./Li_home.module.css"

import { useEffect, useState } from "react"

function Li_home(props){
    const [tipo, setTipo] = useState("")
    useEffect(()=>{
        if(props.confirmacao == 1){
            setTipo("minus")
        }else if(props.confirmacao == 2){
            setTipo("plus")
        }
    },[])
 
    
    return ( 
        <li className={ `${styles.li_comp} ${styles[tipo]}` } key={props.chave}>
            
            <span>{props.nome}</span>
            <span>{props.valor}</span>
            <button className={styles.delete_btn}>x</button>
        </li>
    )
}
export default Li_home