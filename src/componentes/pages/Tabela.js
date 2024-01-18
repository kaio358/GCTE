import {AiOutlineLine,AiOutlineClose,AiOutlineCheck} from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Tabela.module.css"
import BarraDeBusca from "../funcionalidades/BarraDeBusca";


function Tabela(){
    const localizacao = useLocation() 
    console.log(localizacao);
    // const idteste = localizacao.state.id
    // console.log(idteste);

    const itens = [<AiOutlineLine /> ,<AiOutlineClose className={styles.iconRed} /> ,<AiOutlineCheck className={styles.iconGreen}/>]
    const [opcao, setOpcao] = useState(0)
    var i = 0 
    function troca() {
        if(i>itens.length){
            i=0
           
        }else{
            i++
            
        }
        setOpcao(i)
    }
    useEffect(()=>{
        fetch(`http://localhost:5000/pessoa/${2}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(resp => resp.json())
            .then(dados => console.log(dados))
            .catch(erro => console.log(erro))
    })
  
    return(
        <div className={styles.divTab}>
            <h1>Tabela</h1>
            <BarraDeBusca/>
            <table  className={styles.tabela_estilo}>
                <thead className={styles.tabela_head}>
                    <tr>
                        
                        <th>ID</th>
                        <th>Nome</th>
                        <th colspan="2">Escola</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Preço</th>
                        <th className={styles.anEsp}>Pagou</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>Body1 linha1</td>
                        <td colspan="2">Laruo Sanches</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td className={styles.itemEspecifico} onClick={troca } >{itens[opcao]}</td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>Body1 linha1</td>
                        <td colspan="2">Laruo</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td>Body3 linha1</td>
                        <td className={styles.itemEspecifico} onClick={troca } >{itens[opcao]}</td>

                    </tr>
                    
                </tbody>
               
            </table>
        </div>
    )
}
export default Tabela