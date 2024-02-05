
import { useState } from "react"
import styles from "./Home.module.css"

function Home() {
    const [nome,setNome] = useState()
    const [valor,setValor] = useState()
    const [positivo,setPosito] = useState()
    const [negativo,setNegativo]= useState()
    function criarSaldo(){
        if(valor<0){
            setNegativo(parseFloat(valor*(-1)))
        }else{
            setPosito(parseFloat(valor))
        }
       
    }

    return(
        <div className={styles.containerHome}>
           
               
            <h2>Controle de despesas</h2>

            <div className={styles.container}>
                <h4>Saldo atual</h4>
                
                <h1 id="balance" className={styles.balance}>R$ 0.00</h1>

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
                {/* <!-- <li class="minus">
                Salário <span>-$400</span><button class="delete-btn">x</button>
                </li> --> */}
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