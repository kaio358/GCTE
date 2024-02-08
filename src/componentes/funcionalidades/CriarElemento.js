import { useState } from "react"
import {ImCancelCircle} from "react-icons/im"

import styles from "./CriarElemento.module.css"


import InputDefault from "./InputDefault"
import InputFileImage from "./InputFileImage"
import LinkButton from "../layout/LinkButton"

function CriarElemento(props){

   

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

            
        fetch('http://localhost:5000/escola', {
            method: 'POST',
            body: JSON.stringify({
                escolaElemento: escola,
                periodoElemento: periodo
            }),
            headers: {
                'Content-Type': 'application/json'
            }
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
                <InputFileImage id={10} customClass="picture"/>
            </div>
            <div>
                <InputDefault inputTipo="time" valor={periodo} texto={textoPeriodo} tipo="Periodo" nome="periodoElemento"/>
            </div>
            <div>
                
                <InputDefault inputTipo="text" valor={escola} texto={textoEscola} tipo="Escola" nome="escolaElemento" />

            </div>
            <div onClick={enviar} >
                <LinkButton text="Confirmar" tipo="submit"/>
            </div>

        </form>
    )
}

export default CriarElemento