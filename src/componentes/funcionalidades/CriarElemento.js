import { useState } from "react"
import {ImCancelCircle} from "react-icons/im"

import styles from "./CriarElemento.module.css"


import InputDefault from "./InputDefault"
import InputFileImage from "./InputFileImage"
import LinkButton from "../layout/LinkButton"
const caminho = process.env.REACT_APP_API_URL;

function CriarElemento(props){

   const [imagem, setImagem] = useState()
  
   function inserirImagem(novo) {

        setImagem(novo)
        
   }

    const [periodo,setPeriodo] = useState("")
    function textoPeriodo(novo){
        setPeriodo(novo)
    }
    const [escola,setEscola] = useState("")
    function textoEscola(novo){
        setEscola(novo)
    }

    function abaElemento(){
        props.fecharAba(false)
    }
    function enviar() {
      
        const formData = new FormData();
     
        formData.append('escolaElemento', escola);
        formData.append('periodoElemento', periodo);
        formData.append('imagem', imagem);
            
        fetch(`${caminho}/escola`, {
            method: 'POST',
            body: formData,
        
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        

        abaElemento()
            
     
    }
    return(
        <form className={styles.formCriar}  >
             <ImCancelCircle onClick={abaElemento} className={styles.iconFecharElemento}/>
            <h1>Criar novo elemento</h1>
           
            <div>
                <InputFileImage id={11133} customClass="picture" eventoMudarImagem ={inserirImagem}/>
            </div>
            <div>
                <InputDefault inputTipo="time" valor={periodo} texto={textoPeriodo} tipo="Periodo" nome="periodoElemento"/>
            </div>
            <div>
                
                <InputDefault inputTipo="text" valor={escola} texto={textoEscola} tipo="Escola" nome="escolaElemento" />

            </div>
            <div onClick={enviar} >
                <LinkButton text="Confirmar" tipo="submit" />
            </div>

        </form>
    )
}

export default CriarElemento