# 🚀 API RESTful com NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


------------------------------------------------------------------------

## 📌 Descrição

Esta é uma API RESTful desenvolvida utilizando o framework NestJS,
substituindo uma versão anterior em PHP puro.

O projeto segue uma arquitetura moderna baseada em módulos, com foco em:

-   Escalabilidade\
-   Manutenibilidade\
-   Separação de responsabilidades\
-   Boas práticas de mercado

------------------------------------------------------------------------

## 🎯 Objetivo

-   Aplicar arquitetura modular com NestJS\
-   Utilizar TypeScript no backend\
-   Implementar padrão RESTful\
-   Trabalhar com banco relacional\
-   Utilizar variáveis de ambiente\
-   Criar base sólida para aplicações maiores

------------------------------------------------------------------------

## 🧠 Stack

-   Node.js\
-   TypeScript\
-   NestJS\
-   MySQL / PostgreSQL\
-   TypeORM ou Prisma\
-   dotenv\
-   Docker (opcional)

------------------------------------------------------------------------

## 🏗️ Arquitetura

Controller → Service → Repository → Database → Response

### 🔹 Camadas

-   Controller → Entrada HTTP\
-   Service → Regras de negócio\
-   Repository/ORM → Acesso a dados\
-   Module → Organização\
-   DTO → Validação e tipagem

------------------------------------------------------------------------

## 📂 Estrutura

    src/
    ├── modules/
    │   └── users/
    │       ├── dto/
    │       ├── users.controller.ts
    │       ├── users.service.ts
    │       └── users.module.ts
    ├── database/
    ├── config/
    ├── app.module.ts
    └── main.ts

------------------------------------------------------------------------

## ⚙️ Instalação

``` bash
git clone https://github.com/marcelohasilva/rest-api-nestjs.git
cd rest-api-nestjs
npm install
```

------------------------------------------------------------------------

## 🔧 Configuração

``` bash
cp .env.example .env
```

Exemplo:

    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=
    DB_NAME=api_database

    APP_ENV=development
    APP_DEBUG=true

------------------------------------------------------------------------

## ▶️ Execução

``` bash
# desenvolvimento
npm run start:dev

# produção
npm run build
npm run start:prod
```

------------------------------------------------------------------------

## 🌐 Endpoints

### 👤 Users

  Método   Rota         Descrição
  -------- ------------ ------------------
  GET      /users       Lista usuários
  GET      /users/:id   Busca por ID
  POST     /users       Cria usuário
  PUT      /users/:id   Atualiza usuário
  DELETE   /users/:id   Remove usuário

------------------------------------------------------------------------

## 🔎 Exemplo de Resposta

``` json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Marcelo",
      "email": "marcelo@email.com"
    }
  ]
}
```

------------------------------------------------------------------------

## 🔐 Segurança

-   Validação com class-validator\
-   DTOs tipados\
-   Variáveis de ambiente protegidas

Estrutura pronta para:

-   JWT\
-   Guards\
-   Interceptors\
-   Rate limiting\
-   Logs

------------------------------------------------------------------------

## 📈 Roadmap

-   [ ] Autenticação JWT\
-   [ ] Guards de autenticação\
-   [ ] Logs estruturados\
-   [ ] Paginação\
-   [ ] Docker\
-   [ ] Testes automatizados

------------------------------------------------------------------------

## 📝 Padrão de Commits

-   feat: nova funcionalidade\
-   fix: correção\
-   refactor: refatoração\
-   docs: documentação\
-   chore: manutenção

------------------------------------------------------------------------

## 🤝 Contribuição

``` bash
git checkout -b feature/nova-feature
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-feature
```

Abra um Pull Request 🚀

------------------------------------------------------------------------

## 👥 Autores

-   Marcelo Henrique\
-   Ricardo João\
-   Gabriel Lopes\
-   Gabriel Ramos\
-   Thiago Ruan
