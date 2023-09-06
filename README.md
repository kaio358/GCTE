# Gerenciamento de Controle para Transporte Escolar (GCTE)

<p>Este projeto está sendo feito por livre espontânea vontade, pois vejo que meus pais têm muita dificuldade de gerenciar o controle de cobranças de clientes, por este fator farei um pequeno sistema para auxiliá-los, tanto para facilitar as suas buscas, quanto gestão de devedores. </p>

## Paleta de cores

- #B5E2FA
- #0FA3B1
- #F9F7F3
- #EDDEA4
- #F7A072


## Ideias infundadas
<p>Algumas ideias foram criadas e esquecidas ao decorrer, muitos delas foram implementadas na parte de Gerenciar.js, veremos logo a baixo a descrição:</p>

1- Criar evento e executar no componente pai para criar/deletar o componente filho passando do pai para o filho, para tal o evento no iniciaria no pai e finalizaria no filho dando alguns retoques. Essa ideia foi implementada com eventos de cliques, onde eu precisava adicionar algo ou deletar. A princípio parece algo lógico executar, mas gerava mais bugs do que solução, era igual uma aposta que causava mais erros do que solução, na primeira tentativa foi para deletar o componente Mensagem, onde tinha o styles para delimitar o tamanho padrão ao se gerado por cada mensagem, entretanto ao pedir deletar essa limitação do styles ia junto, logo o componente não era deletado no processo, mas sim o conteúdo, sendo assim o componente criado mesmo que não aparecesse estava por cima do conteúdo principal, afetando as outras funcionalidades.

2- Classes (objetos), tinha uma vaga esperança em substituir Hooks e valores constantes sendo passados dos componentes filhos para o pai, a minha ideia era limpar o tanto de funções criadas a facilitar o processo, o único problema foi a preguiça de fazer