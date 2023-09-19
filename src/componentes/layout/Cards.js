import { useState,useEffect,useRef} from 'react'
import {AiOutlineClose} from "react-icons/ai"

import InputDefault from '../funcionalidades/InputDefault'
import InputFileImage from '../funcionalidades/InputFileImage'
import LinkButton from '../layout/LinkButton'
import styles from './Cards.module.css'


function Cards({img,periodo,escola,idTabela, eventPai,atualizar,nomes,periodos}){

    const [textPeriodo, setTextPeriodo] = useState(periodo)
    const [ textoEscola, setTextoEscola] = useState(escola)
    const [salvaDados,setSalvaDados] = useState()
    const opacidade = useRef()
    useEffect(() => {
        const intervalId = setInterval(() => {
            const horario = new Date(`01/01/2000 ${textPeriodo}`);
            let aux = textPeriodo;


            if (!isNaN(horario.getTime())) {
           
                if (horario.getHours() < 12) {
                    setTextPeriodo("Manhã");
                } else if (horario.getHours() <= 18) {
                    setTextPeriodo("Tarde");
                } else {
                    setTextPeriodo("Noite");
                }
          
            } else {
                setTextPeriodo(salvaDados);
            }
            setSalvaDados(aux);
         
        }, 6000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    

    function textoNome(novo){
        setTextoEscola(novo )
    }
    function textoPer(novo){
        setTextPeriodo(novo)
    }
 

    function deletar(){
        nomes(textoEscola)
        periodos(textPeriodo)
        atualizar(true)
    }

    
    return(
        <div className={styles.card}>
        
            <div>
                {eventPai? <AiOutlineClose className={styles.icon_deletar} onClick={deletar}/> : ''}
                {eventPai ? <InputFileImage img={img}  id={idTabela} />:<img src={img}/>}
            </div>
            <div>
          
                {eventPai? <InputDefault inputTipo="time"  texto={textoPer} />:  <h2 ref={opacidade}>{textPeriodo}</h2> }
                {eventPai? <InputDefault valor={textoEscola} texto={textoNome}/>:  <h3>{textoEscola}</h3> }
             
              
              
                <LinkButton text="Entra" to="/tabela"/> 
            </div>
        </div>
    )
}

export default Cards