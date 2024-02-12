import { useState} from "react"
import {ImCancelCircle} from "react-icons/im"

import InputDefault from "./InputDefault"
import InputFileImage from "./InputFileImage"


import styles from "./AbaInputClientes.module.css"

function AbaInputClientes(props){
    function fechaAba() {
        props.fecharAbaInput()
    }

    // Para inserir valores 
    const [nome,setNome] = useState("")
    function textoNome(novo){
        setNome(novo)
    }
 
    const [endereco,setEndereco] = useState("")
    function textoEndereco(novo){
        setEndereco(novo)
    }
    const [telefone,setTelefone] = useState("")
    function textoTelefone(novo){
        setTelefone(novo)
    }
    const [preco,setPreco] = useState("")
    function textoPreco(novo){
        setPreco(novo)
    }
    const [parcelas,setParcelas] = useState("")
    function textoParcelas(novo){
        setParcelas(novo)
    }
    const [dias,setDias] = useState("")
    function textoDias(e){
        setDias(e.target.value)
    }
    const [mes,setMes] = useState("")
    function textoMes(e){
        setMes(e.target.value)
    }

    function  enviar() {
        fetch("http://localhost:5000/pessoa/inserir",{
            method:"Post",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( {
                nome:nome,
                endereco:endereco,
                telefone:telefone,
                valor:preco,
                parcelas:parcelas,
                dias:dias,
                mes:mes,
                idEscola: props.idTabela
            })
        }).then(resp=>resp.json()).then(dados=>console.log(dados)).catch(erro=>console.log(erro))
    }
    return(
        <div className={styles.formAbaCliente} >
            <ImCancelCircle className={styles.iconFecharElemento } onClick={fechaAba}/>
            <h1>Criar novo cliente</h1>
            <div >
                <InputFileImage id={10} className={styles.imgInputCliente} customClass="cicle_picture"/>
            </div>
            <div>
                <InputDefault inputTipo="text" valor={nome} texto={textoNome}  tipo="nome" nome="nome" onChange={nome}/>
            </div>
            <div>
                <InputDefault inputTipo="text" valor={endereco} texto={textoEndereco} tipo="Endereço" nome="endereco" />
            </div>
            <div>
                <InputDefault inputTipo="tel" valor={telefone} texto={textoTelefone} tipo="Telefone" nome="telefone" />
            </div>
            <div>
                <InputDefault inputTipo="number" valor={preco} texto={textoPreco} tipo="Preço" nome="preco" />
            </div>
            <div>
                <InputDefault inputTipo="number" valor={parcelas} texto={textoParcelas} tipo="Quantas Parcelas " nome="parcelas" /> 
                
            </div>
            <div>
                <input type="number" value={dias} min={0} max={31} className={styles.input_dias} placeholder="Dias" onChange={textoDias}/>
                <input type="number" value={mes} min={0} max={12} className={styles.input_dias} placeholder="A partir de que mês " onChange={textoMes}/>
            </div>
            <div onClick={enviar} >
              <button className={styles.botao_aba} onClick={fechaAba}>Enviar</button>
            </div>

        </div>
    )
}

export default AbaInputClientes