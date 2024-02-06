
import { useState } from "react"
import styles from "./Home.module.css"

function Home() {
    const [nome,setNome] = useState()
    const [valor,setValor] = useState()
    const [positivo,setPosito] = useState(0)
    const [negativo,setNegativo]= useState(0)
    const [total,setTotal] = useState(0)
    const [lista_li,setLista_li] = useState([])

    var cont = 0

    function criarSaldo(){
        cont ++;
        let tipo 
        setTotal(parseFloat(total)+parseFloat(valor))
        if(valor<0){
            tipo = 'minus'
            setNegativo(parseFloat(negativo)+parseFloat(valor*(-1)))
        }else{
            tipo = 'plus'
            setPosito(parseFloat(positivo)+ parseFloat(valor))
        }
    
        criarLi(tipo, cont)
    }
    function criarLi(tipo, cont){
        let li = <li className={styles[tipo]} key={cont}>Salário <span>{valor}</span><button className={styles.delete_btn}>x</button></li>
        lista_li.push(li)
    }
    return(
        <div className={styles.containerHome}>
           
               
            <h2>Controle de despesas</h2>

            <div className={styles.container}>
                <h4>Saldo atual</h4>
                
                <h1 id="balance" className={styles.balance}>R$ {total}</h1>

                <div className={styles.inc_exp_container}>
                    <div>
                    <h4>Receitas</h4>
                    <p id="money-plus" className={ `${styles.money} ${styles.plus}`}>+ R$ {positivo}</p>
                    </div>

                    <div>
                    <h4>Despesas</h4>
                    <p id="money-minus" className={`${styles.money} ${styles.minus}`}>- R$ {negativo}</p>
                    </div>
                </div>

                <h3>Transações</h3>
                <ul id="transactions" className={styles.transactions}>
                {lista_li? lista_li.map(l=>{
                        return l
                    }) 
                    :''
                }
       
                </ul>

                <h3>Adicionar transação</h3>
                <div id="form">
                    <div className={styles.form_control}>
                        <label htmlFor="text">Nome</label>
                        <input type="text" id="text" className={styles.inputTextHome} placeholder="Nome da transação" onChange={(e)=>setNome(e.target.value)} />
                    </div>

                    <div className="form_control">
                    <label  htmlFor="amount">Valor <br />
                        <small>(negativo - despesas, positivo - receitas)</small>
                    </label>
                    <input type="number" id="amount" className={styles.inputNumberHome} placeholder="Valor da transação" onChange={(e)=>setValor(e.target.value)} />
                    </div>

                    <button className={styles.btn} onClick={criarSaldo} >Adicionar</button>
                </div>
                </div>


        </div>
    )
}

export default Home