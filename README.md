# 🚀 MarketHub API — Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
  API RESTful desenvolvida com NestJS e TypeScript para o projeto MarketHub.
</p>

---

## 📌 Sobre o projeto

O **MarketHub** é uma plataforma voltada ao comércio eletrônico, com foco na divulgação e comercialização de produtos por meio de marketplaces e programas de afiliados.

Este repositório contém o backend da aplicação, responsável pelo processamento das requisições, gerenciamento de dados, autenticação de usuários e execução das regras de negócio.

A API utiliza o framework NestJS e segue uma arquitetura modular, buscando facilitar a organização, manutenção e expansão do sistema.

## 🎯 Objetivos

- Desenvolver uma API RESTful utilizando NestJS.
- Aplicar TypeScript no desenvolvimento backend.
- Utilizar arquitetura modular.
- Implementar autenticação e proteção de rotas.
- Gerenciar dados utilizando Prisma ORM.
- Desenvolver funcionalidades para o comércio eletrônico.
- Integrar o backend com a interface frontend.
- Aplicar boas práticas de desenvolvimento.
- Trabalhar com versionamento e colaboração em equipe.

## 🛠️ Tecnologias utilizadas

| **Tecnologia** | **Finalidade** |
|---|---|
| Node.js | Ambiente de execução do backend |
| TypeScript | Linguagem de programação |
| NestJS | Framework utilizado para desenvolver e estruturar a API |
| Prisma ORM | Comunicação e gerenciamento das operações com o banco de dados |
| PostgreSQL / SQLite | Bancos de dados relacionais, conforme configuração do ambiente |
| JWT (JSON Web Token) | Autenticação e autorização de usuários |
| class-validator | Validação dos dados recebidos pela API |
| class-transformer | Transformação de objetos e dados |
| Swagger | Documentação e visualização interativa dos endpoints |
| Git | Controle de versão do código-fonte |
| GitHub | Hospedagem do repositório e colaboração entre os integrantes |
| Postman | Testes e validação das requisições HTTP |

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura modular baseada nos recursos oferecidos pelo NestJS.

### Fluxo de funcionamento

```text
Requisição HTTP
      |
      v
Controller
      |
      v
Service
      |
      v
Prisma ORM
      |
      v
Banco de Dados
      |
      v
Resposta HTTP
```

### Camadas da aplicação

- **Module:** organiza os componentes e funcionalidades da aplicação.
- **Controller:** recebe e direciona as requisições HTTP.
- **Service:** concentra as regras de negócio.
- **DTO:** define a estrutura e validação dos dados recebidos.
- **Prisma ORM:** realiza as operações de acesso ao banco de dados.
- **Guards:** controlam o acesso às rotas protegidas.

## 📂 Estrutura do projeto

```text
src/
├── common/
│   ├── guards/
│   └── services/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── products/
│   └── carts/
│       ├── carts.controller.ts
│       ├── carts.service.ts
│       ├── carts.module.ts
│       └── carts.dto.ts
│
├── prisma/
│   └── prisma.service.ts
│
├── app.module.ts
└── main.ts

prisma/
└── schema.prisma
```

*Estrutura resumida dos principais diretórios e módulos da aplicação.*

## ⚙️ Instalação

Primeiramente, clone o repositório:

```bash
git clone https://github.com/RicardoNsm/markethub-backend-nestjs.git
```

Entre na pasta do projeto:

```bash
cd markethub-backend-nestjs
```

Instale as dependências:

```bash
npm install
```

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência, caso esteja disponível.

Configure as variáveis necessárias para a execução da aplicação, incluindo:

- Conexão com o banco de dados.
- Chave secreta utilizada na autenticação JWT.
- Outras configurações exigidas pelos módulos da aplicação.

> **Importante:** não compartilhe credenciais, tokens ou arquivos `.env` com informações privadas no repositório.

Após configurar o ambiente, execute os comandos do Prisma necessários para preparar o banco de dados, conforme a configuração do projeto.

## ▶️ Execução

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

Para compilar o projeto:

```bash
npm run build
```

Para iniciar a versão de produção:

```bash
npm run start:prod
```

Durante o desenvolvimento, a API pode ser acessada localmente em:

```text
http://localhost:3000
```

## 🌐 Endpoints

As rotas versionadas utilizam o prefixo `/v1`.

### 🔐 Auth

Módulo responsável pela autenticação dos usuários e geração de tokens de acesso.

A autenticação utiliza JWT para permitir o acesso às funcionalidades protegidas da aplicação.

### 👤 Users

Módulo responsável pelo gerenciamento dos usuários da plataforma.

Entre suas responsabilidades estão o cadastro, gerenciamento e identificação dos usuários.

### 🛍️ Products

Módulo responsável pelo gerenciamento dos produtos disponíveis na plataforma.

Contempla informações dos produtos, disponibilidade e dados necessários para as funcionalidades de comércio eletrônico.

### 🛒 Carts

Módulo responsável pelo gerenciamento do carrinho de compras dos usuários autenticados.

Todas as rotas do carrinho exigem autenticação JWT.

| **Método** | **Rota** | **Descrição** |
|---|---|---|
| GET | `/v1/carts` | Lista os produtos do carrinho |
| POST | `/v1/carts` | Adiciona um produto ao carrinho |
| PUT | `/v1/carts/:productId` | Atualiza a quantidade de um produto |
| DELETE | `/v1/carts/:productId` | Remove um produto específico |
| DELETE | `/v1/carts` | Remove todos os produtos do carrinho |

#### Adicionar produto ao carrinho

**POST** `/v1/carts`

Corpo da requisição:

```json
{
  "productId": "uuid-do-produto"
}
```

#### Atualizar quantidade de um produto

**PUT** `/v1/carts/:productId`

Corpo da requisição:

```json
{
  "quantity": 2
}
```

#### Funcionalidades do carrinho

- Associação dos itens ao usuário autenticado.
- Verificação da existência dos produtos.
- Verificação da disponibilidade dos produtos.
- Verificação do estoque.
- Adição de produtos ao carrinho.
- Atualização da quantidade de produtos.
- Remoção individual de produtos.
- Limpeza completa do carrinho.

## 🔒 Segurança

A API utiliza mecanismos para proteger os dados e controlar o acesso às funcionalidades.

Entre os recursos utilizados estão:

- Autenticação por JWT.
- Proteção de rotas utilizando Guards.
- Validação de dados com DTOs e class-validator.
- Configuração de variáveis de ambiente.
- Controle de acesso às funcionalidades autenticadas.

## 🧪 Testes

Durante o desenvolvimento, as requisições HTTP podem ser testadas utilizando ferramentas como Postman.

Para verificar se o projeto compila corretamente, execute:

```bash
npm run build
```

## 📈 Roadmap

O projeto está em desenvolvimento e poderá receber novas funcionalidades e melhorias.

- [x] Estrutura inicial da API com NestJS.
- [x] Organização modular.
- [x] Integração com Prisma ORM.
- [x] Autenticação JWT.
- [x] Proteção de rotas.
- [x] Implementação das operações do carrinho.
- [ ] Testes automatizados.
- [ ] Paginação e otimização das consultas.
- [ ] Logs estruturados.
- [ ] Docker.
- [ ] Melhorias e novas funcionalidades da plataforma.

## 📝 Padrão de commits

Para manter o histórico de alterações organizado, o projeto utiliza os seguintes prefixos:

| **Prefixo** | **Finalidade** |
|---|---|
| `feat` | Adição de novas funcionalidades |
| `fix` | Correção de problemas |
| `refactor` | Refatoração de código |
| `docs` | Alterações na documentação |
| `chore` | Tarefas de manutenção |
| `test` | Adição ou alteração de testes |

Exemplo:

```bash
git commit -m "feat: implement cart module"
```

## 🤝 Contribuição

As contribuições são realizadas por meio de branches e Pull Requests, permitindo que as alterações sejam revisadas pelos integrantes da equipe.

Fluxo de contribuição:

```bash
git checkout -b feature/nova-funcionalidade
git add .
git commit -m "feat: descrição da funcionalidade"
git push origin feature/nova-funcionalidade
```

Após enviar as alterações, abra um Pull Request para revisão da equipe.

## 👥 Equipe de desenvolvimento

| **Integrante** | **GitHub** |
|---|---|
| Marcelo Henrique | [@marcelohasilva](https://github.com/marcelohasilva) |
| Ricardo João | [@RicardoNsm](https://github.com/RicardoNsm) |
| Gabriel Lopes | [@Gabriel-lopes06](https://github.com/Gabriel-lopes06) |
| Thiago Ruan | [@ThyagoRuan](https://github.com/ThyagoRuan) |

---

<p align="center">
  Desenvolvido em equipe como parte do projeto MarketHub.
</p>
