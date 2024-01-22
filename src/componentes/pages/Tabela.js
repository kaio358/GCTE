
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Tabela.module.css"
import BarraDeBusca from "../funcionalidades/BarraDeBusca";
import Linha_tabela from "../layout/Linha_tabela";

function Tabela(){
    const localizacao = useLocation() 
    // console.log(localizacao);
    // const idteste = localizacao.state.id
    // console.log(idteste);


    const [pessoas,setPessoa] = useState()


    useEffect(()=>{
        fetch(`http://localhost:5000/pessoa/${2}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(resp => resp.json())
            .then(dados => setPessoa(dados))
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
                        <th  coLSpan="2">Escola</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Preço</th>
                        <th className={styles.anEsp}>Pagou</th>
                    </tr>
                </thead>
                <tbody>
        
                    <Linha_tabela/>
                    <Linha_tabela/>
                    {pessoas? pessoas.map(p=>{
                        return p.idpessoa
                    }) : "Seila"}
                </tbody>
               
            </table>
        </div>
    )
}
export default Tabela