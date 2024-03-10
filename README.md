# CRUD-Jquery

Este é um simples projeto de CRUD (Create, Read, Update, Delete) utilizando jQuery, Bootstrap e PHP. Ele demonstra como criar, visualizar, atualizar e excluir registros de uma base de dados utilizando AJAX para comunicação assíncrona com o servidor.

## Requisitos

- XAMPP (ou outro servidor web compatível com PHP)
- Navegador web moderno

## Instalação

1. Clone ou faça o download deste repositório para o diretório raiz do seu servidor web.
2. Importe o arquivo `crud.sql` localizado na raiz do projeto para o seu banco de dados. Isso criará a estrutura inicial da tabela necessária para o funcionamento do CRUD.
3. Certifique-se de que o servidor web esteja em execução (por exemplo, XAMPP).
4. Navegue até o diretório onde o projeto foi clonado ou extraído no seu navegador web.
5. O projeto deve estar pronto para uso.

## Utilização

1. Abra o navegador web e navegue até o diretório onde o projeto foi instalado.
2. Você verá a interface do CRUD com opções para criar, visualizar, atualizar e excluir registros.
3. Clique nos botões correspondentes para realizar as operações desejadas.
4. Os dados serão enviados e recebidos do servidor sem recarregar a página, graças ao uso do AJAX.

## Estrutura do Projeto

- **index.php**: Página inicial que contém a interface do CRUD.
- **js/**: Scripts JavaScript.
- **server/**: Diretório contendo scripts PHP para manipulação do banco de dados e lógica de aplicação.
  - **conexao.php**: Script para estabelecer conexão com o banco de dados.
  - **api.php**: Funções auxiliares para operações CRUD.

## Contribuição

Contribuições são bem-vindas! Se você encontrar um bug ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---