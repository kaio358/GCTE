import { useState } from 'react'

import InputFileImage from '../funcionalidades/InputFileImage'
import LinkButton from '../layout/LinkButton'
import styles from './Cards.module.css'


function Cards({img,periodo,escola,idTabela, eventPai}){
    const [textPeriodo, setTextPeriodo] = useState(periodo)
    const [ textoEscola, setTextoEscola] = useState(escola)
    function mudarTextoPeriodo(e) {
        setTextPeriodo(e.target.value)
      }
    function mudarTextoEscola(e){
        setTextoEscola(e.target.value)
    }
    
    
    return(
        <div className={styles.card}>
        <div>{eventPai ? <InputFileImage img={img}  id={idTabela} />:<img src={img}/>}</div>
            <div>
                {eventPai?<input type='text' value={textPeriodo} onChange={mudarTextoPeriodo}  />:  <h2>{textPeriodo}</h2> }
                {eventPai?<input type='text' value={textoEscola} onChange={mudarTextoEscola}  />:  <h3>{textoEscola}</h3> }
             
              
              
                <LinkButton text="Entra" to="/tabela"/> 
            </div>
        </div>
    )
}

export default Cards