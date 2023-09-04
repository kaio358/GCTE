
import { useState,useRef } from "react"
// import {LuChevronLeft} from "react-icons/lu"

import Container from "../layout/Container"
import styles from "./Gerenciar.module.css" 

import Cards from "../layout/Cards"
import Mensagem from "../funcionalidades/Mensagem"


import creche from "../../imgs/creche.jpg"
import parquinho from "../../imgs/parquinho.jpg"
import professora_sala_aula from "../../imgs/professora_sala_aula.jpg"
import ensino_medio from "../../imgs/ensino_medio.jpg"

import icon_lapis from "../../imgs/icons/lapis.png"
import icon_papel from "../../imgs/icons/folha-de-papel.png"

function Gerenciar(){
   
    
    const [nome, setNome] = useState('')
    const [fecharDelet,setFecharDelet] = useState(false)

    const [editou, setEditou] = useState(false)
    
    function nomes(novo){
        setNome(novo)
    }
    function atualizar(novo) {
        setFecharDelet(novo)
    }
    var clicou = false
    function editar(){
     
        if(!clicou){
            clicou= true
           
    
           
       
        }else{
            clicou = false
           
            
        }
      
        setEditou(clicou)
    }
    return(
        <div className={styles.containerCards}>
            <div className={styles.superior_ger}>

                <h1 className={styles.introducao}>Gerenciamento</h1>
                <div className={styles.icons_ger}>
                    <div className={styles.icon_ger} onClick={()=> editar() } >
                        <img src={icon_lapis}/>
                    </div>
                    <div className={styles.icon_ger}>
                        <img src={icon_papel}  />
                    </div>
                    
                   
                </div>
            </div>
            
           <Container>
               
                <Cards img={creche} periodo="Manhã" escola="Creche" idTabela={1} eventPai={editou} atualizar={atualizar} nomes={nomes}/>
                <Cards img={parquinho} periodo="Manhã" escola="Parquinho" idTabela={2} eventPai={editou} atualizar={atualizar} nomes={nomes}/>
                <Cards img={ensino_medio} periodo="Manhã" escola="Escola"  idTabela={3} eventPai={editou} atualizar={atualizar} nomes={nomes}/>
                <Cards img={professora_sala_aula} periodo="Tarde" escola="Escola" idTabela={4} eventPai={editou} atualizar={atualizar} nomes={nomes}/>
                
               
               
                
            </Container> 
        
    
            {fecharDelet? 
                <Mensagem atualizar={atualizar}>
                    <p>Têm certeza em deletar o {nome} no período de manhã?  </p>
                    <button>Sim</button> <button onClick={()=>atualizar(false)}>Não</button >
                </Mensagem> :
                ""
            
            }
     
        </div>
    )
}
export default Gerenciar