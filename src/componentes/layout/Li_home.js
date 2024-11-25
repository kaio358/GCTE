import styles from "./Li_home.module.css"

import { useEffect, useState } from "react"

function Li_home(props){
    const [tipo, setTipo] = useState("")
    useEffect(()=>{
       
        if(props.confirmacao == 2){
            setTipo("plus")
        } else{
            setTipo("minus")
        }
    },[])
 
    // Converte para um objeto Date 
    const dataObj = new Date(props.data); 
    // Formata a data para o padrão brasileiro 
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric'})
   
    
    return ( 
        <li className={ `${styles.li_comp} ${styles[tipo]}` } key={props.chave}>
            
            <span>{props.nome}</span>
            <span>{dataFormatada}</span>
            <span>{props.valor}</span>
            {/* <button className={styles.delete_btn}>x</button> */}
        </li>
    )
}
export default Li_home