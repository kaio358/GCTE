import { useState,useEffect,useRef} from 'react'
import {AiOutlineClose} from "react-icons/ai"

import InputDefault from '../funcionalidades/InputDefault'
import InputFileImage from '../funcionalidades/InputFileImage'
import LinkButton from './LinkButton'
import styles from './Cards.module.css'


function Cards({img,periodo,escola,idTabela, eventPai,atualizar,nomes,periodos,chave, iDCard}){

    const [textPeriodo, setTextPeriodo] = useState(periodo)
    const [ textoEscola, setTextoEscola] = useState(escola)
    const [imagensTip, setImagensTip] = useState(img)

    const [mudou,setMudou] = useState(false)
    const opacidade = useRef()
    
    
    function textoNome(novo){
        setMudou(true)
        setTextoEscola(novo )
    }
    function textoPer(novo){
        setMudou(true)
        setTextPeriodo(novo)
    }
    function mudarImagens(novo) {
        setMudou(true)
        setImagensTip(novo)
    }
 

    function deletar(){
        nomes(textoEscola)
        periodos(textPeriodo)
        iDCard(chave)
        atualizar(true)
    }
    if(!eventPai){
  
        if(mudou){
            const formData = new FormData();
            formData.append('id', chave);
            formData.append('nome', textoEscola);
            formData.append('horario',textPeriodo);
            formData.append('imagem', imagensTip);
                
          
            // console.log("Teste", {id:chave,nome:textoEscola,horario:textPeriodo});
            fetch(`http://44.211.217.237:5000/escola`,{
                method:'PUT',
                body:formData
            }).then(resp => resp.json())
        }
     
    }
    // console.log(img);
    
    return(
        <div className={styles.card} id={chave} key={chave}>
        
            <div>
                {eventPai? <AiOutlineClose className={styles.icon_deletar} onClick={deletar}/> : ''}
                {eventPai ? <InputFileImage img={img}  id={idTabela} eventoMudarImagem={mudarImagens} />:<img src={img}/>}
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