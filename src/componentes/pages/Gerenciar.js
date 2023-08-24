
import { useState, useEffect } from "react"
import {LuChevronLeft} from "react-icons/lu"

import Container from "../layout/Container"
import styles from "./Gerenciar.module.css" 
import LinkButton from '../layout/LinkButton'
import Cards from "../layout/Cards"

import creche from "../../imgs/creche.jpg"
import parquinho from "../../imgs/parquinho.jpg"
import professora_sala_aula from "../../imgs/professora_sala_aula.jpg"
import ensino_medio from "../../imgs/ensino_medio.jpg"
function Gerenciar(){
    const [editou, setEditou] = useState(false)
    var clicou = false
    function click(){
        if(!clicou){
            clicou= true
       
        }else{
            clicou = false
          
        }
        setEditou(clicou)
    }
    return(
        <div className={styles.containerCards}>
            <h1 className={styles.introducao}>Gerenciamento</h1>
           <Container>
               
                <Cards img={creche} periodo="Manhã" escola="Creche" eventPai={editou}/>
                <Cards img={parquinho} periodo="Manhã" escola="Parquinho"/>
                <Cards img={ensino_medio} periodo="Manhã" escola="Escola"/>
                <Cards img={professora_sala_aula} periodo="Tarde" escola="Escola"/>
                
               
               
                
            </Container> 
            <div className={styles.menu_lateral}>
                <input type="checkbox" id="check_menu" className={styles.inputMenu}/>
                <label for="check_menu">
                    <LuChevronLeft/>

                </label>
                <ul className={styles.opcao_menu_lateral}>
                    <li onClick={()=> click() }>Editar</li>
                    <li>Criar</li>
                    <li>Excluir</li>
                  
                </ul>
            </div>
        </div>
    )
}
export default Gerenciar