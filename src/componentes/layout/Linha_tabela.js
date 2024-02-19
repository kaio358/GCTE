import styles from "./Linha_tabela.module.css";

import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState, useEffect} from "react";


function Linha_tabela(props){
    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    const [opcao, setOpcao] = useState(0)
    const [timer, setTimer] = useState(null); 

    useEffect(() => {
   
        if (props.confirmacao !== undefined) {
          setOpcao(props.confirmacao);
        }
      }, [props.confirmacao]); 



    function troca() {
        if (opcao >= itens.length - 1) {
            setOpcao(0);
        } else {
            setOpcao(opcao + 1);
        }
        
        // Redefinir o temporizador após a troca da opção
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            enviarParaServidor();
        }, 5000);
        setTimer(newTimer);
    }

    function enviarParaServidor() {
        fetch("http://localhost:5000/pagamento/confirmacao", {
          method: "POST",
          body: JSON.stringify({
            id: props.id,
            pagou: opcao
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(resp => resp.json())
        .then(dados => console.log(dados))
        .catch(erro => console.log(erro));
      }

    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.nome}</td>
            <td colSpan="2">{props.escola}</td>
            <td>{props.endereco}</td>
            <td>{props.telefone}</td>
            <td>{props.valorPago}</td>
            <td className={styles.itemEspecifico} onClick={()=>{
                troca();
                // clearTimeout(timer);
            }} >{itens[opcao]}</td>
        </tr>
    )
}


export default Linha_tabela