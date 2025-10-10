API de Gerenciamento de Usuários e Pets

Sobre o Projeto

Esta é uma API RESTful desenvolvida como parte de uma atividade de estudo. O objetivo é criar um sistema de backend para gerenciar usuários e seus respectivos pets, aplicando conceitos de arquitetura em camadas (Controller, Business, Data), validação de dados e comunicação com um banco de dados SQL através do Knex.js.

Funcionalidades

Usuários (Users):

Criação de novos usuários.

Listagem de todos os usuários.

Atualização de usuários existentes.

Deleção de usuários.

Pets:

Criação de novos pets, associados a um usuário.

Listagem de todos os pets.

Deleção de pets.

A deleção de um usuário remove seus pets em cascata (ON DELETE CASCADE).

Tecnologias Utilizadas

Node.js: Ambiente de execução do JavaScript no servidor.

TypeScript: Superset do JavaScript que adiciona tipagem estática.

Express.js: Framework para construção de APIs em Node.js.

Knex.js: Query builder para SQL, utilizado para a comunicação com o banco de dados.

MySQL / SQLite: Banco de dados relacional para persistência dos dados.

Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente.

Pré-requisitos

Node.js (versão 16 ou superior)

Um gerenciador de pacotes como NPM ou Yarn

Um banco de dados SQL (MySQL, PostgreSQL ou SQLite)

Passos

Clone o repositório:
git clone https://github.com/salazarr0/Atividade-API-Pets-e-Users-.git

Acesse a pasta do projeto:
cd Atividade-API-Pets-e-Users-

Instale as dependências:
npm install

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto, baseado no arquivo .env.example (se houver).

Adicione as credenciais do seu banco de dados:
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

Execute as migrações do banco de dados:

Este comando irá criar as tabelas users e pets no seu banco de dados.
npx knex migrate:latest

Inicie a aplicação:

O servidor estará rodando em http://localhost:3003 (ou a porta que você configurou).
npm run dev

Documentação da API

Endpoints de Usuários (Users)

POST /users - Criar Usuário

Descrição: Cria um novo usuário.

Corpo da Requisição (Body):
{ "name": "João Silva", "email": "joao.silva@example.com" }

Resposta de Sucesso: 201 Created com o objeto do usuário criado.

Respostas de Erro: 400 Bad Request se os dados forem inválidos.

PUT /users/:id - Atualizar Usuário

Descrição: Atualiza o nome e/ou email de um usuário existente.

Parâmetros de URL: id (numérico) do usuário.

Corpo da Requisição (Body):
{ "name": "João da Silva Sauro", "email": "joao.sauro@example.com" }

Resposta de Sucesso: 200 OK com o objeto do usuário atualizado.

Respostas de Erro: 400 Bad Request, 404 Not Found, 409 Conflict.

DELETE /users/:id - Deletar Usuário

Descrição: Deleta um usuário e todos os seus pets associados.

Parâmetros de URL: id (numérico) do usuário.

Resposta de Sucesso: 200 OK com o objeto do usuário que foi deletado.

Respostas de Erro: 400 Bad Request, 404 Not Found.

Endpoints de Pets

POST /pets - Criar Pet

Descrição: Cria um novo pet e o associa a um usuário existente.

Corpo da Requisição (Body):
{ "name": "Rex", "user_id": 1 }

Resposta de Sucesso: 201 Created com o objeto do pet criado.

Respostas de Erro: 400 Bad Request se os dados forem inválidos, 404 Not Found se o user_id não existir.

GET /pets - Listar Todos os Pets

Descrição: Retorna uma lista de todos os pets cadastrados.

Resposta de Sucesso: 200 OK com um array de objetos de pets.

Autor
-   Samuel Salazar Barros Guimarães - [salazarr0](https://github.com/salazarr0)
