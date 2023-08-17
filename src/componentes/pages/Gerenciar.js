import Container from "../layout/Container"

import styles from "./Gerenciar.module.css"

import creche from "../../imgs/creche.jpg"
import parquinho from "../../imgs/parquinho.jpg"
import professora_sala_aula from "../../imgs/professora_sala_aula.jpg"
import ensino_medio from "../../imgs/ensino_medio.jpg"
function Gerenciar(){
    return(
        <div className={styles.containerCards}>
            <h1 className={styles.introducao}>Gerenciamento</h1>
           <Container>
                <div className={styles.card}>
                    <div><img src={creche}/></div>
                    <div>
                        <h2>Manhã</h2>
                        <h3>Creche</h3>
                        <button>Entrar</button>
                    </div>
                </div>

                <div className={styles.card}>
                    <div>
                        <img src={parquinho}/>  

                    </div>
                    <div>
                        <h2>Manhã</h2>
                        <h3>Parquinho</h3>
                        <button>Entrar</button>

                    </div>

                </div>
                <div className={styles.card}>
                    <div>
                        <img src={ensino_medio}/>  

                    </div>
                    <div>
                        <h2>Manhã</h2>
                        <h3>Escola</h3>
                        <button>Entrar</button>

                    </div>

                </div>
                <div className={styles.card}>
                    <div>
                        <img src={professora_sala_aula}/>  

                    </div>
                    <div>
                        <h2>Tarde</h2>
                        <h3>Escola</h3>
                        <button>Entrar</button>

                    </div>

                </div>
                
            </Container> 
        </div>
    )
}
export default Gerenciar