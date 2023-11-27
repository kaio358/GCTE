
import styles from "./Home.module.css"

function Home() {
    return(
        <div className={styles.containerHome}>
           
               
            <h2>Controle de despesas</h2>

            <div className={styles.container}>
                <h4>Saldo atual</h4>
                
                <h1 id="balance" className={styles.balance}>R$ 0.00</h1>

                <div className={styles.inc_exp_container}>
                    <div>
                    <h4>Receitas</h4>
                    <p id="money-plus" className={ `${styles.money} ${styles.plus}`}>+ R$0.00</p>
                    </div>

                    <div>
                    <h4>Despesas</h4>
                    <p id="money-minus" className={`${styles.money} ${styles.minus}`}>- R$0.00</p>
                    </div>
                </div>

                <h3>Transações</h3>
                <ul id="transactions" className={styles.transactions}>
                {/* <!-- <li class="minus">
                Salário <span>-$400</span><button class="delete-btn">x</button>
                </li> --> */}
                </ul>

                <h3>Adicionar transação</h3>
                <form id="form">
                    <div className={styles.form_control}>
                        <label htmlForfor="text">Nome</label>
                        <input autofocus type="text" id="text" className={styles.inputTextHome} placeholder="Nome da transação" />
                    </div>

                    <div className="form_control">
                    <label htmlfor="amount">Valor <br />
                        <small>(negativo - despesas, positivo - receitas)</small>
                    </label>
                    <input type="number" id="amount" className={styles.inputNumberHome} placeholder="Valor da transação" />
                    </div>

                    <button className={styles.btn}  >Adicionar</button>
                </form>
                </div>


        </div>
    )
}

export default Home