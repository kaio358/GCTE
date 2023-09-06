import { useState } from "react"

import styles from "./CriarElemento.module.css"


import InputDefault from "./InputDefault"
import InputFileImage from "./InputFileImage"

function CriarElemento(){
    const [periodo,setPeriodo] = useState("")
    function textoPeriodo(novo){
        setPeriodo(novo)
    }
    const [escola,setEscola] = useState("")
    function textoEscola(novo){
        setEscola(novo)
    }
    return(
        <form className={styles.formCriar}>
            <h1>Criar novo elemento</h1>
            <InputFileImage id={10}/>
            <div>
                
                <InputDefault valor={periodo} texto={textoPeriodo} tipo="Periodo"/>

            </div>
            <div>
                
                <InputDefault valor={escola} texto={textoEscola} tipo="Escola"/>

            </div>

        </form>
    )
}

export default CriarElemento