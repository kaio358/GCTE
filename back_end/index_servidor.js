const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require('node-cron');
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");

const rotaEscola = require("./rotas/rotaEscola");
const rotaImagens = require("./rotas/rotaImagens");
const rotaPessoa = require("./rotas/rotaPessoa");
const rotaPagamento = require("./rotas/rotaPagamento");
const rotaMensagem = require("./rotas/rotaMensagem");
const rotaTransacao = require("./rotas/rotaTransacao");

const Pagamento = require("./modelos/Pagamento");
const Mensagem = require("./modelos/Mensagem");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Configurar rotas
app.use("/", rotaEscola);
app.use("/", rotaImagens);
app.use("/", rotaPessoa);
app.use("/", rotaPagamento);
app.use("/", rotaMensagem);
app.use("/", rotaTransacao);

// Conexão com banco e inicialização de tabelas
conexao.connect(erro => {
    if (erro) {
        console.log("Erro na conexão com o banco:", erro);
    } else {
        console.log("Conexão com o banco de dados bem-sucedida.");
        Tabelas.init(conexao);

        // Agendar cron jobs (atenção: Lambda não suporta cron diretamente)
        cron.schedule('0 0 * * *', async () => {
            try {
                const today = new Date();
                await Pagamento.atualizarDevedor(today);
                const pagamentosNaoPagos = await Pagamento.pegarPorDataENaoPagou();
                pagamentosNaoPagos.forEach(pnp => {
                    Mensagem.atualizaOuInseriImportante(pnp.idPagamento);
                });
                console.log("Verificação diária de pagamentos concluída.");
            } catch (error) {
                console.error('Erro ao verificar pagamentos:', error);
            }
        });
    }
});

module.exports = app; 
