import styles from "./Linha_tabela.module.css";

import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useState, useEffect} from "react";
import InputDefault from "../funcionalidades/InputDefault";


function Linha_tabela(props){
    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    
    const [opcao, setOpcao] = useState(props.confirmacao)
    // console.log(opcao);
    const [timer, setTimer] = useState(null); 

    // Para modifcar textos
    const [mudou,setMudou] = useState(false)

  
    const [textoNome,setTextoNome] = useState(props.nome)
    function modificarTextoNome(novo){
      setMudou(true)
      setTextoNome(novo)
    }
    const [textoEndeco, setTextoEndereco] = useState(props.endereco)
    function modificarTextoEndereco(novo){
      setMudou(true)
      setTextoEndereco(novo)
    }
 
    const [textoTelefone, setTextoTelefone] = useState(props.telefone)
    function modificarTextoTelefone(novo){
      setMudou(true)
      setTextoTelefone(novo)
    }
    const [textoValorPago, setTextoValorPago] = useState(props.valorPago)

    function modificarTextoValorPago(novo){
      setMudou(true)
      setTextoValorPago(novo)
    }

    if(!props.eventoLapis){
        if(mudou){
       
          fetch("http://GCTE-LoadBalancer-2114462684.us-east-1.elb.amazonaws.com0/pessoa/atualizar",{
            method:"PUT",
            body: JSON.stringify({
              id: props.id,
              dados: { "nome":textoNome, "endereco":textoEndeco, "telefone":textoTelefone},
              valor: textoValorPago
            }),
            headers:{
              'Content-Type':'application/json'
            }
          })
          .then(resp => resp.json())
          .then(dados => console.log(dados))
          .catch(erro=> console.log(erro))
        }
    }
  
    
    useEffect(() => {
   
        if (props.confirmacao !== undefined) {
          setOpcao(props.confirmacao);
        }
      }, [props.confirmacao]); 


      let novaOpcao = opcao; 
    function troca() {
     
     
        if (opcao >= itens.length - 1) {
            setOpcao(0);
            novaOpcao = 0;
        } else {
            setOpcao(opcao + 1);
            novaOpcao+=1;
        }
   
        // Redefinir o temporizador após a troca da opção
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            enviarParaServidor(novaOpcao);
        }, 5000);
        setTimer(newTimer);
    }
   
    function enviarParaServidor(teste) {
    
      
        fetch("http://GCTE-LoadBalancer-2114462684.us-east-1.elb.amazonaws.com/pagamento/confirmacao", {
          method: "PUT",
          body: JSON.stringify({
            id: props.idPagamento,
            pagou: teste != opcao ? teste : opcao
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(resp => resp.json())
        .then(dados => console.log(dados))
        .catch(erro => console.log(erro));
      }
      // console.log(props.confirmacao);
    
    return(
      
        <tr>
            <td>{props.id}</td>
            {props.eventoLapis?  <td><InputDefault inputTipo="text" tipo="informe o nome" valor={textoNome} texto={modificarTextoNome}/></td>:  <td>{textoNome}</td>}
            <td colSpan="2">{props.escola}</td>
            {props.eventoLapis?  <td><InputDefault inputTipo="text" tipo="informe o endereço" valor={textoEndeco} texto={modificarTextoEndereco}/></td>:  <td>{textoEndeco}</td>}
            {props.eventoLapis?  <td><InputDefault inputTipo="tel" tipo="informe o telefone" valor={textoTelefone} texto={modificarTextoTelefone}/></td>:  <td>{textoTelefone}</td>}
            {props.eventoLapis?  <td><InputDefault inputTipo="number" tipo="informe o valor" valor={textoValorPago} texto={modificarTextoValorPago}/></td>:  <td>{textoValorPago || props.valorPago}</td>}
            {/* {props.confirmacao?  <td className={styles.itemEspecifico} onClick={()=>{ troca();}} >{itens[props.confirmacao]}</td>:   <td className={styles.itemEspecifico} onClick={()=>{ troca();}} >{itens[opcao]}</td>} */}
            <td className={styles.itemEspecifico} onClick={()=>{ troca();}} >{itens[opcao]}</td>
        </tr>
    )
}


export default Linha_tabela