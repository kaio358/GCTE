import styles from "./Linha_tabela_.module.css";

import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState } from "react";

function Linha_tabela(){
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
            <td>01</td>
            <td>Body1 linha1</td>
            <td colSpan="2">Laruo Sanches</td>
            <td>Body3 linha1</td>
            <td>Body3 linha1</td>
            <td>Body3 linha1</td>
            <td className={styles.itemEspecifico} onClick={troca } >{itens[opcao]}</td>
        </tr>
    )
}


export default Linha_tabela