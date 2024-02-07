import styles from "./Linha_tabela.module.css";

import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState } from "react";

function Linha_tabela(props){
    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    const [opcao, setOpcao] = useState(0)

    function troca() {
  
        let i = opcao
        if(i>=itens.length -1){
         
            i=0
           
        }else{
            i++
           
        }
     
        setOpcao(i)
    }
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.nome}</td>
            <td colSpan="2">{props.escola}</td>
            <td>{props.endereco}</td>
            <td>{props.telefone}</td>
            <td>{props.valorPago}</td>
            <td className={styles.itemEspecifico} onClick={troca } >{itens[opcao]}</td>
        </tr>
    )
}


export default Linha_tabela