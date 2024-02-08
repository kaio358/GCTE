import { useState} from "react"
import {ImCancelCircle} from "react-icons/im"

import InputDefault from "./InputDefault"
import InputFileImage from "./InputFileImage"
import LinkButton from "../layout/LinkButton"

import styles from "./AbaInputClientes.module.css"

function AbaInputClientes(props){
    function fechaAba() {
        props.fecharAbaInput()
    }

    return(
        <form className={styles.formAbaCliente}>
            <ImCancelCircle className={styles.iconFecharElemento } onClick={fechaAba}/>
            <h1>Criar novo cliente</h1>
            <div >
                <InputFileImage id={10} className={styles.imgInputCliente} customClass="cicle_picture"/>
            </div>
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