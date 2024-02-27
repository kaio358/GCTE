const express = require("express")
const rota = express()

const Escola = require("../modelos/Escola")
const Imagens = require("../modelos/Imagens")

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

rota.get('/escola',async (req,res)=>{
    const dados = await Escola.lista()
    res.json(dados)
   
  
})

rota.post('/escola',upload.single('imagem'), async (req,res)=>{
    const dados = {"nome":req.body.escolaElemento, "horario": req.body.periodoElemento}
    let result = '';
    if(req.file.originalname.length >45){
       
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 45) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
    }else{
        result = req.file.originalname
    }
 
    const escolaAdciona =  await Escola.adiciona(dados)
    const imagem_dados = {"nome":result, "tipo":req.file.mimetype, "dados_imagens":req.file.buffer, "Escola_idEscola":escolaAdciona}  
  
    const imagemAdiciona = await Imagens.adiciona(imagem_dados)
    console.log(imagemAdiciona);
    
    

})
rota.delete('/escola',(req,res)=>{
    const id = req.body.id
    console.log(id);
    Escola.deleta(id)
})
rota.put('/escola',upload.single("imagem"),(req,res)=>{
    const id = req.body.id
    
    const nome = req.body.nome
    const horario = req.body.horario
    console.log();
    Escola.atualizar(id,nome,horario)

    let result = '';
    if(req.file.originalname.length >45){
       
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 45) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
    }else{
        result = req.file.originalname
    }
 

    const imagem_dados = {"nome":result, "tipo":req.file.mimetype, "dados_imagens":req.file.buffer}  
  
    // Imagens.altera(1,imagem_dados)
    
    
})



module.exports = rota