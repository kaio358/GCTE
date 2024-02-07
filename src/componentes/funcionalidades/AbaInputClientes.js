import { useState} from "react"
import {ImCancelCircle} from "react-icons/im"

import InputDefault from "./InputDefault"
import LinkButton from "../layout/LinkButton"


function AbaInputClientes(){
    return(
        <form>
            <ImCancelCircle/>
            <h2>Criar novo cliente</h2>
            {/* <div>
                <InputFileImage id={10}/>
            </div> */}
            <div>
                <InputDefault inputTipo="text"  tipo="nome" nome="nome"/>
            </div>
            <div>
                
                <InputDefault inputTipo="text" tipo="Escola" nome="escola" />

            </div>
            <div>
                
                <InputDefault inputTipo="text" tipo="Escola" nome="escola" />
               
            </div>
            <div>
                
                <InputDefault inputTipo="text" tipo="Endereço" nome="endereco" />
               
            </div>
            <div>
                
                <InputDefault inputTipo="tel" tipo="Telefone" nome="telefone" />
               
            </div>
            <div  >
                <LinkButton text="Confirmar" tipo="submit"/>
            </div>

        </form>
    )
}

export default AbaInputClientes