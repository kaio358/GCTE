
import { useState} from "react"
// import {LuChevronLeft} from "react-icons/lu"

import Container from "../layout/Container"
import styles from "./Gerenciar.module.css" 

import Cards from "../layout/Cards"
import Mensagem from "../funcionalidades/Mensagem"
import CriarElemento from "../funcionalidades/CriarElemento"


import creche from "../../imgs/creche.jpg"
import parquinho from "../../imgs/parquinho.jpg"
import professora_sala_aula from "../../imgs/professora_sala_aula.jpg"
import ensino_medio from "../../imgs/ensino_medio.jpg"

import icon_lapis from "../../imgs/icons/lapis.png"
import icon_papel from "../../imgs/icons/folha-de-papel.png"

function Gerenciar(){
   
    
    const [nome, setNome] = useState('')
    const [periodo, setPeriodo] = useState('')


    const [fecharDelet,setFecharDelet] = useState(false)


    const [editou, setEditou] = useState(false)
    const [novoElemento, setNovoElemento] = useState(false)
    
    function nomes(novo){
        setNome(novo)
    }
    function periodos(novo){
        setPeriodo(novo)
    }

    
    function atualizar(novo) {
        setFecharDelet(novo)
    }

    function fecharAba(novo) {
        setNovoElemento(novo)
    }
    var clicouEditar = false
    var clicouCriar = false

    function editar(){
        if(!clicouEditar){
            clicouEditar= true
        }else{
            clicouEditar = false  
        }
        setEditou(clicouEditar)
    }
    function criarNovoElemento(){
        if(!clicouEditar){
            clicouCriar= true
        }else{
            clicouCriar = false  
        }
        setNovoElemento(clicouCriar)
    }
    return(
        <div className={styles.containerCards}>
            <div className={styles.superior_ger}>

                <h1 className={styles.introducao}>Gerenciamento</h1>
                <div className={styles.icons_ger}>
                    <div className={styles.icon_ger} onClick={editar } >
                        <img src={icon_lapis}/>
                    </div>
                    <div className={styles.icon_ger} onClick={criarNovoElemento}>
                        <img src={icon_papel}  />
                    </div>
                    
                   
                </div>
            </div>
            
           <Container>
               
                <Cards img={creche} periodo="Manhã" escola="Creche" idTabela={1} eventPai={editou} atualizar={atualizar} nomes={nomes} periodos={periodos}/>
                <Cards img={parquinho} periodo="Manhã" escola="Parquinho" idTabela={2} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos}/>
                <Cards img={ensino_medio} periodo="Manhã" escola="Escola"  idTabela={3} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos}/>
                <Cards img={professora_sala_aula} periodo="Tarde" escola="Escola" idTabela={4} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos}/>
                
               
               
                
            </Container> 
        
    
            {fecharDelet? 
                <Mensagem atualizar={atualizar}>
                    <p>Têm certeza em deletar o {nome} no período de {periodo}?  </p>
                    <button>Sim</button> <button onClick={()=>atualizar(false)}>Não</button >
                </Mensagem> :
                ""
            
            }
        {
            novoElemento?
                <CriarElemento fecharAba={fecharAba}/>:
                ""
        }
        </div>
    )
}
export default Gerenciar