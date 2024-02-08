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
    const [nome,setNome] = useState("")
    function textoNome(novo){
        setNome(novo)
    }
    const [escola,setEscola] = useState("")
    function textoEscola(novo){
        setEscola(novo)
    }
    const [endereco,setEndereco] = useState("")
    function textoEndereco(novo){
        setEndereco(novo)
    }
    const [telefone,setTelefone] = useState("")
    function textoTelefone(novo){
        setTelefone(novo)
    }

    function  enviar() {
        fetch("http://localhost:5000/pessoa/inserir",{
            method:"Post",
            body: JSON.stringify( {
                nome:nome,
                escola:escola,
                endereco:endereco,
                telefone:telefone
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(dados=>console.log(dados)).catch(erro=>console.log(erro))
    }
    return(
        <form className={styles.formAbaCliente} >
            <ImCancelCircle className={styles.iconFecharElemento } onClick={fechaAba}/>
            <h1>Criar novo cliente</h1>
            <div >
                <InputFileImage id={10} className={styles.imgInputCliente} customClass="cicle_picture"/>
            </div>
            <div>
                <InputDefault inputTipo="text" valor={nome} texto={textoNome}  tipo="nome" nome="nome" onChange={nome}/>
            </div>
            <div>
                
                <InputDefault inputTipo="text" valor={escola} texto={textoEscola} tipo="Escola" nome="escola" />

            </div>
            <div>
                
                <InputDefault inputTipo="text" valor={endereco} texto={textoEndereco} tipo="Endereço" nome="endereco" />
               
            </div>
            <div>
                
                <InputDefault inputTipo="tel" valor={telefone} texto={textoTelefone} tipo="Telefone" nome="telefone" />
               
            </div>
            <div onClick={enviar} >
                <LinkButton text="Confirmar" tipo="submit" />
            </div>

        </form>
    )
}

export default AbaInputClientes