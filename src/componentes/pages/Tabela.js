import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState } from "react";

import styles from "./Tabela.module.css"

function Tabela(){
    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    const [opcao, setOpcao] = useState(0)
    var i = 0 
    function troca() {
        if(i>itens.length){
            i=0
           
        }else{
            i++
            
        }
        setOpcao(i)
    }
  
    return(
        <div className={styles.divTab}>
            <h1>Tabela</h1>
            <table  className={styles.tabela_estilo}>
                <thead className={styles.tabela_head}>
                    <tr>
                        
                        <th>ID</th>
                        <th>Nome</th>
                        <th colspan="2">Escola</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Preço</th>
                        <th className={styles.anEsp}>Pagou</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>Body1 linha1</td>
                        <td colspan="2">Laruo Sanches</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td className={styles.itemEspecifico} onClick={troca } >{itens[opcao]}</td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>Body1 linha1</td>
                        <td colspan="2">Laruo</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td className={styles.itemEspecifico} onClick={troca } >{itens[opcao]}</td>

                    </tr>
                    
                </tbody>
               
            </table>
        </div>
    )
}
export default Tabela