const express = require("express");
const http = require("http");  
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
const server = http.createServer(app); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(express.json());

const conexao = require("./infraestrutura/conexao")
const tabelas = require("./infraestrutura/tabelas")

const rotaEscola = require("./rotas/rotaEscola")
const rotaImagens = require("./rotas/rotaImagens")
const rotaPessoa = require("./rotas/rotaPessoa")

conexao.connect(erro=>{
    if(erro){
        console.log(erro);
    }else{
        
        tabelas.init(conexao)
        app.use("/",rotaEscola)
        app.use("/",rotaImagens)
        app.use("/", rotaPessoa)
        server.listen(5000, () => {
            console.log("Conectado: http://localhost:5000");
        });

    }
})