
import { useEffect, useState } from "react"
import styles from "./Home.module.css"
import Li_home from "../layout/Li_home"

function Home() {
    const [nome,setNome] = useState()
    const [valor,setValor] = useState()
    const [positivo,setPosito] = useState(0)
    const [negativo,setNegativo]= useState(0)
    const [total,setTotal] = useState(0)
    const [lista_li,setLista_li] = useState([])

    const [dadosPagamento , setDadosPagamento] = useState()
    const [nomesPag, setNomesPag] = useState()

    var cont = 0
    
 
  
   
    function criarSaldo(){
       
        
        cont ++;
        
        let tipo 
        let conf 
        setTotal(parseFloat(total)+parseFloat(valor))
        if(valor<0){
            tipo = 'minus'
            conf = 1
            setNegativo(parseFloat(negativo)+parseFloat(valor*(-1)))
        }else{
            tipo = 'plus'
            conf =2
            setPosito(parseFloat(positivo)+ parseFloat(valor))
        }
        
        
       
        criarLi(tipo, conf,cont)
    }
    function criarLi(tipo, conf,cont){
        const data = new Date()
        
        
        lista_li.push(<Li_home tipo={tipo} confirmacao={conf} nome={nome} valor={valor} chave={cont} data={data}/>)
    }


    useEffect(()=>{
     
        fetch("http://GCTE-LoadBalancer-2114462684.us-east-1.elb.amazonaws.com/pagamentos/data",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(resp => resp.json())
        .then(dados => {
           
            setDadosPagamento(dados)
            return dados
        } )
        .then( dados =>{
            
            const promises = dados.map(d => {
                    
                    
                return fetch(`http://GCTE-LoadBalancer-2114462684.us-east-1.elb.amazonaws.com/pessoa/pagamento/nome`, {
                  method: 'POST',
                  body: JSON.stringify({
                    idPessoa: d.pessoa_idpessoa
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(resp => resp.json());
            });
            return Promise.all(promises);
        })
        .then(dados => setNomesPag(dados))
        .catch(erro => console.log(erro))
       

    },[])
    useEffect(() => {
        if (dadosPagamento) {
            let acumuladoNegativo = 0
            let acumuladoPositivo = 0
            const tol = dadosPagamento.reduce((total, dp) =>{ 
                if(dp.confirmacao == 2){
                    acumuladoPositivo = acumuladoPositivo  + dp.valor
                    return total + dp.valor
                }else{
                    acumuladoNegativo = acumuladoNegativo  + dp.valor
                    
                    return total - dp.valor

                }
              
            }, 0);
            setNegativo(acumuladoNegativo)
            setPosito(acumuladoPositivo)
            setTotal(tol)
            
        }
    }, [dadosPagamento]);
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
                {dadosPagamento? dadosPagamento.map((dp,i)=>{
                    // console.log(dp.data);
                    
                    
                    if(nomesPag){
                        if(nomesPag[0].length >1 && nomesPag.length <=1){
                            return <Li_home chave={dp.idPagamento} data={dp.data} valor={dp.valor} confirmacao = {dp.confirmacao} nome={nomesPag[0][i].nome}/>
                        }else{
                            return <Li_home chave={dp.idPagamento} data={dp.data} valor={dp.valor} confirmacao = {dp.confirmacao} nome={nomesPag[i][0].nome}/>
                        }
                        
                    }else{

                        return <Li_home chave={dp.idPagamento} valor={dp.valor} confirmacao = {dp.confirmacao} />
                    }
                }):''}
                {/* <Li_home nome={"KAIO"} valor={22} confirmacao={2} chave={55555}/> */}
       
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