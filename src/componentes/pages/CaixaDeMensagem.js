import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../funcionalidades/Message";
import styles from "./CaixaDeMensagem.module.css";

function CaixaDeMensagem() {
    const [dadosPagamento, setDadosPagamento] = useState([]);
    const [mensagensPag, setMensagensPag] = useState([]);

    useEffect(() => {
        // Fetch novo e antigo combinados
        fetch("http://ec2-44-201-229-29.compute-1.amazonaws.com:5000/dadosParaMensagem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(dados => {
        
            setDadosPagamento(dados);
            const arrayDados = dados.map(dp => ({
                cor: dp.pagamento.confirmacao === 2 ? "corGreen" : "corVer",
                pagou: dp.pagamento.confirmacao === 2 ? "Pagou" : "Não pagou"
            }));
            setMensagensPag(arrayDados);
        })
        .catch(erro => console.log(erro));
    }, []);

    function confirLido(idPag) {
        fetch("http://ec2-44-201-229-29.compute-1.amazonaws.com:5000/mensagemConfirmarLida", {
            method: "POST",
            body: JSON.stringify({
                idPagamento: idPag
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(resp => resp.json());
    }

    return (
        <div className={styles.div_caixa_mensagem}>
            <section>
                <ul className={styles.guia_caixa_de_mensagem}>
                    <li><Link to="/mensagens/geral" className={`${styles.link_li} ${styles.posicaoAtual}`}>Geral</Link></li>
                    <li><Link to="/mensagens/importante" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Importante</Link></li>
                    <li><Link to="/mensagens/lida" className={`${styles.link_li} ${styles.posicaoNaoAtual}`}>Lida(s)</Link></li>
                </ul>
            </section>
            <section className={styles.box_message}>
                <ul>
                    {dadosPagamento.length > 0 && dadosPagamento.map((p, i) => {
                        // console.log(p , p.pessoas[0].nome , mensagensPag[i].cor, mensagensPag[i].pagou);
                        
                        return <Link
                            to={`/textoMensagem?${p.pagamento.idpagamento}`}
                            onClick={() => confirLido(p.pagamento.idpagamento)}
                            className={styles.link_li}
                            key={p.pagamento.idpagamento}
                        >
                            <Message
                                nome_user={p.pessoas[0].nome} 
                                customCor={mensagensPag[i].cor}
                                mensagem_pago_ou_nao={mensagensPag[i].pagou}
                            />
                        </Link>
                    })}
                </ul>
            </section>
        </div>
    );
}

export default CaixaDeMensagem;
