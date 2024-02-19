import styles from "./Linha_tabela.module.css";

import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState, useEffect} from "react";


function Linha_tabela(props){
    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    const [opcao, setOpcao] = useState(props.confirmacao || 0)
    console.log(props.confirmacao);
    const [timer, setTimer] = useState(null); 



    useEffect(() => {

        const setNewTimer = () => {
            clearTimeout(timer); 
            const newTimer = setTimeout(() => {
              enviarParaServidor();
            }, 5000);
            setTimer(newTimer);
          };
      
   
          setNewTimer();
      
          return () => {
            clearTimeout(timer);
          };
      }, [opcao]);

    function troca() {
        
        if(opcao>=itens.length -1){
            setOpcao(0);
        }else{
            setOpcao(parseInt(opcao)+1);
            
          
        }
    
   
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