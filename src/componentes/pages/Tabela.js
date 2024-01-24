
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Tabela.module.css"
import BarraDeBusca from "../funcionalidades/BarraDeBusca";
import Linha_tabela from "../layout/Linha_tabela";

function Tabela(){
    const localizacao = useLocation() 

    const idteste = localizacao.search
    const ourNumber = idteste.match(/\d+/)[0]
  



    const [pessoas,setPessoa] = useState()
    const [valor,setValor] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/pessoa/${ourNumber}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(resp => resp.json())
            .then(dados => setPessoa(dados))
            .catch(erro => console.log(erro))
        // console.log(pessoas.pessoa);
        pessoas ? pessoas.pessoa.map(p=>{
           
            fetch(`http://localhost:5000/pagamento/${p.idpessoa}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
                .then(resp => resp.json())
                .then(dados =>  valor.push(dados))
                .catch(erro => console.log(erro))
        }) : console.log("nada");
        console.log(valor);
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
        
                   
             
                    {pessoas? pessoas.pessoa.map(p=>{        
                            
                        return pessoas.escola.map(e=>{
                            return <Linha_tabela id={ p.idpessoa} nome={p.nome} escola={e.nome} endereco={p.endereco} telefone={p.telefone}/>   
                        })
                       
                    }) : ""}
                </tbody>
               
            </table>
        </div>
    )
}
export default Tabela


// pessoas.map(p=>{
//     // return <Linha_tabela id={ p.idpessoa} nome={p.nome} endereco={p.endereco} telefone={p.telefone}/> 
//     return p
// })