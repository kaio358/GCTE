import { useState,useEffect,useRef} from 'react'
import {AiOutlineClose} from "react-icons/ai"

import InputDefault from '../funcionalidades/InputDefault'
import InputFileImage from '../funcionalidades/InputFileImage'
import LinkButton from '../layout/LinkButton'
import styles from './Cards.module.css'


function Cards({img,periodo,escola,idTabela, eventPai,atualizar,nomes,periodos,chave, iDCard}){

    const [textPeriodo, setTextPeriodo] = useState(periodo)
    const [ textoEscola, setTextoEscola] = useState(escola)
    const [salvaDados,setSalvaDados] = useState()
    const [mudou,setMudou] = useState(false)
    const opacidade = useRef()
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const horario = new Date(`01/01/2000 ${textPeriodo}`);
    //         let aux = textPeriodo;
    //         let cont = 0 

    //         if (!isNaN(horario.getTime())  && cont == 0 ) {
           
    //             if (horario.getHours() < 12) {
    //                 setTextPeriodo("Manhã");
    //             } else if (horario.getHours() <= 18) {
    //                 setTextPeriodo("Tarde");
    //             } else {
    //                 setTextPeriodo("Noite");
    //             }
    //             cont++
    //         } else {
            
    //             cont = 0
    //             setTextPeriodo(salvaDados);
    //         }
    //         setSalvaDados(aux);

    //     }, 6000);
    
    //     return () => {
    //       clearInterval(intervalId);
    //     };
    //   }, []);
    

    function textoNome(novo){
        setMudou(true)
        setTextoEscola(novo )
    }
    function textoPer(novo){
        setMudou(true)
        setTextPeriodo(novo)
    }
 

    function deletar(){
        nomes(textoEscola)
        periodos(textPeriodo)
        iDCard(chave)
        atualizar(true)
    }
    if(!eventPai){
  
        if(mudou){
          
            console.log("Teste", {id:chave,nome:textoEscola,horario:textPeriodo});
            fetch(`http://localhost:5000/escola`,{
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify( {id:chave,nome:textoEscola,horario:textPeriodo})
            }).then(resp => resp.json())
        }
     
    }
    
    return(
        <div className={styles.card} id={chave}>
        
            <div>
                {eventPai? <AiOutlineClose className={styles.icon_deletar} onClick={deletar}/> : ''}
                {eventPai ? <InputFileImage img={img}  id={idTabela} />:<img src={img}/>}
            </div>
            <div>
          
                {eventPai? <InputDefault inputTipo="time"  texto={textoPer} />:  <h2 ref={opacidade}>{textPeriodo}</h2> }
                {eventPai? <InputDefault valor={textoEscola} texto={textoNome}/>:  <h3>{textoEscola}</h3> }
             
              
              
                <LinkButton text="Entra" to={ `/tabela?id=${chave}` }  /> 
            </div>
        </div>
    )
}

export default Cards