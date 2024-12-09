
import { useState, useEffect} from "react"
// import {LuChevronLeft} from "react-icons/lu"

import Container from "../layout/Container"
import styles from "./Gerenciar.module.css" 

import Cards from "../layout/Cards"
import Mensagem from "../funcionalidades/Mensagem"
import CriarElemento from "../funcionalidades/CriarElemento"


import creche from "../../imgs/creche.jpg"
import parquinho from "../../imgs/parquinho.jpg"
import professora_sala_aula from "../../imgs/professora_sala_aula.jpg"
import ensino_medio from "../../imgs/ensino_medio.jpg"

import icon_lapis from "../../imgs/icons/lapis.png"
import icon_papel from "../../imgs/icons/folha-de-papel.png"

const caminho = process.env.REACT_APP_API_URL;


function Gerenciar(){
    
    

    const [nome, setNome] = useState('')
    const [periodo, setPeriodo] = useState('')
    const [idEsc , setIdEsc] = useState()

    

    const [fecharDelet,setFecharDelet] = useState(false)


    const [editou, setEditou] = useState(false)
    const [novoElemento, setNovoElemento] = useState(false)

    const [card, setCards] = useState([])
    const [imagens, setImagens] = useState([])
    const [base64Image, setBase64Image] = useState('');




    useEffect(()=>{
        fetch(`${caminho}/escola`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(data=>{
            setCards(data)
            return data
        })
        .then(dados => {
            const promises = dados.map(d=> {
              return fetch(`${caminho}/image/escola/${d.idEscola}`, {
                method: 'GET',
              })
                .then(resp => resp.json());
            });
            return Promise.all(promises);
          })
          .then(dados => {
            // filter(subarray => subarray.length > 0)
            const arraySemVazias = dados.flat();
            
            setImagens(arraySemVazias)
           
          })
        .catch(err=>console.log(err))

     
        
        
        
     
    },[])

    useEffect(()=>{
    
        if(imagens.length){
            

            // let stringBase64 = ``

            const imagensAdaptado = imagens.map((img,i)=>{
        
                let arrayBufferes = img.dados_imagens.data;
               
              
                const uint8Array = new Uint8Array(arrayBufferes);
                let binaryString = '';
                for (let i = 0; i < uint8Array.length; i++) {
                    binaryString += String.fromCharCode(uint8Array[i]);
                }

                const base64Imagens = btoa(binaryString);
                let stringBase64 = ''
             
                stringBase64 = `data:${img};base64,${base64Imagens}`
          
                return stringBase64;
            })
      


     
         
            setBase64Image(imagensAdaptado)
       
        }
    },[imagens])
   
    
    // para Cards
    function nomes(novo){
        setNome(novo)
    }
    function periodos(novo){
        setPeriodo(novo)
    }
    function ids(novo){
        setIdEsc(novo)
    }



    
    function atualizar(novo) {
        setFecharDelet(novo)
    }

    function fecharAba(novo) {
        setNovoElemento(novo)
    }
    function deletar() {
       
        fetch(`${caminho}/escola`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json'
        }, 
        body:  JSON.stringify({ id: idEsc })
        }).then(resp=>resp.json())
        
        atualizar(false)
        window.location.reload();
        
    }

    var clicouEditar = false
    var clicouCriar = false

    function editar(){
        if(!clicouEditar){
            clicouEditar= true
        }else{
      
            clicouEditar = false  
        }
        
        setEditou(clicouEditar)
    }
    function criarNovoElemento(){
        if(!clicouEditar){
            clicouCriar= true
        }else{
            clicouCriar = false  
        }
        setNovoElemento(clicouCriar)
    }


    return(
        <div className={styles.containerCards}>
            <div className={styles.superior_ger}>

                <h1 className={styles.introducao}>Gerenciamento</h1>
                <div className={styles.icons_ger}>
                    <div className={styles.icon_ger} onClick={editar } >
                        <img src={icon_lapis}/>
                    </div>
                    <div className={styles.icon_ger} onClick={criarNovoElemento}>
                        <img src={icon_papel}  />
                    </div>
                    
                   
                </div>
            </div>
            
           <Container>
               
                <Cards chave={555} img={creche} periodo="19:42" escola="Creche" idTabela={1} eventPai={editou} atualizar={atualizar} nomes={nomes} periodos={periodos} iDCard={ids}/>
                <Cards chave={575} img={parquinho} periodo="14:00" escola="Parquinho" idTabela={2} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos} iDCard={ids}/>
                <Cards chavve={585} img={ensino_medio} periodo="7:00" escola="Escola"  idTabela={3} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos} iDCard={ids}/>
                <Cards chave={595} img={professora_sala_aula} periodo="8:00" escola="Escola" idTabela={4} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos} iDCard={ids}/>
                <Cards chave={565} img={professora_sala_aula} periodo="8:00" escola="Escola" idTabela={4} eventPai={editou} atualizar={atualizar} nomes={nomes}  periodos={periodos} iDCard={ids}/>
                
            
                
                {
                   
                   card? card.map( (c, i)=>{
                        if(imagens){

                       
                         
                            if(imagens[i]?.Escola_idEscola == c.idEscola){
                                  
                                return <Cards
                                    chave={ c.idEscola} 
                                    img={base64Image[i]}
                                    periodo={c.horario} 
                                    escola={c.nome} idTabela={c.idEscola+5} 
                                    eventPai={editou} atualizar={atualizar} 
                                    nomes={nomes} 
                                    periodos={periodos}
                                    iDCard={ids}
                                    />
                               
                            }else{
                                return <Cards
                                    chave={ c.idEscola} 
                                    img="http://placeholder.com/500"
                                    periodo={c.horario} 
                                    escola={c.nome} idTabela={c.idEscola+5} 
                                    eventPai={editou} atualizar={atualizar} 
                                    nomes={nomes} 
                                    periodos={periodos}
                                    iDCard={ids}
                                />
                            }
                  
                        }else{
                            return <Cards
                            chave={ c.idEscola} 
                            img="http://placeholder.com/500"
                            periodo={c.horario} 
                            escola={c.nome} idTabela={c.idEscola+5} 
                            eventPai={editou} atualizar={atualizar} 
                            nomes={nomes} 
                            periodos={periodos}
                            iDCard={ids}
                            />
                        }
                     
                   }):""
               }
               
                
            </Container> 
        
    
    
            {fecharDelet? 
                <Mensagem atualizar={atualizar}>
                    <p>Têm certeza em deletar o {nome} no período de {periodo}?  </p>
                    <button onClick={deletar} className={styles.btn_mensagem} >Sim</button> <button onClick={()=>atualizar(false)} className={styles.btn_mensagem}>Não</button >
                </Mensagem> :
                ""
            
            }
        {
            novoElemento?
                <CriarElemento fecharAba={fecharAba}/>:
                ""
        }
        </div>
    )
}
export default Gerenciar



