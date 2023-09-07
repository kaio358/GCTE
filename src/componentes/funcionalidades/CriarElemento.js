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
    return(
        <form className={styles.formCriar} action="" method="POST">
             <ImCancelCircle onClick={abaElemento} className={styles.iconFecharElemento}/>
            <h1>Criar novo elemento</h1>
           
            <div>
                <InputFileImage id={10}/>
            </div>
            <div>
                <InputDefault valor={periodo} texto={textoPeriodo} tipo="Periodo"/>
            </div>
            <div>
                
                <InputDefault valor={escola} texto={textoEscola} tipo="Escola"/>

            </div>
            <div>
                <LinkButton text="Confirmar" tipo="submit"/>
            </div>

        </form>
    )
}

export default CriarElemento