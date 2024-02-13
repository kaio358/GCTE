import styles from "./Linha_tabela.module.css";

import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState } from "react";

function Linha_tabela(props){
    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    const [opcao, setOpcao] = useState(0)
    const [tipoOpcao, setTipoOpcao] = useState()

    function troca() {
        
        if(opcao>=itens.length -1){
            setOpcao(0);
        }else{
            setOpcao(parseInt(opcao)+1);
        }
        setTipoOpcao(opcao)
        const tempo = setInterval(()=>{
            fetch("http://localhost:5000/pagamento/confirmacao",{
                method:"Post",
                body:JSON.stringify({
                    id:props.id,
                    pagou: tipoOpcao
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json()).then(dados=> console.log(dados)).catch(erro=> console.log(erro))
        },5000)
        setTimeout(() => {
            clearInterval(tempo);
        }, 5000); 
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