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
const rotaPagamento = require("./rotas/rotaPagamento")


// para conferir pagamento diario
const cron = require('node-cron');
const Pagamento = require("./modelos/Pagamento")



conexao.connect(erro=>{
    if(erro){
        console.log(erro);
    }else{
        

        tabelas.init(conexao)

        cron.schedule('0 0 * * *', async () => {
            try {
                const today = new Date();
                Pagamento.atualizarDevedor(today)
                console.log("ola");
            } catch (error) {
                console.error('Erro ao verificar pagamentos:', error);
            }
        });
        app.use("/",rotaEscola)
        app.use("/",rotaImagens)
        app.use("/", rotaPessoa)
        app.use("/",rotaPagamento)
        server.listen(5000, () => {
            console.log("Conectado: http://localhost:5000");
        });

    }
})