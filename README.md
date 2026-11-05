# 🚀 MarketHub API — Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="110" alt="NestJS Logo" />
</p>

<p align="center">
  API RESTful desenvolvida com NestJS e TypeScript para o projeto MarketHub.
</p>

---

## 📌 Sobre o projeto

O **MarketHub** é uma plataforma voltada ao comércio eletrônico, com foco na divulgação e comercialização de produtos por meio de marketplaces e programas de afiliados.

Este repositório contém o backend da aplicação, responsável pelo processamento das requisições, regras de negócio, autenticação, gerenciamento de dados e comunicação com o banco de dados.

A API foi desenvolvida utilizando NestJS, seguindo uma arquitetura modular que facilita a manutenção, a escalabilidade e a evolução do sistema.

## 🎯 Objetivos

- Desenvolver uma API RESTful utilizando NestJS.
- Aplicar TypeScript no desenvolvimento backend.
- Organizar a aplicação em módulos.
- Implementar autenticação e proteção de rotas.
- Gerenciar dados utilizando Prisma ORM.
- Desenvolver funcionalidades para o comércio eletrônico.
- Integrar o backend com a interface frontend.
- Aplicar boas práticas de desenvolvimento e trabalho em equipe.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Node.js | Ambiente de execução |
| TypeScript | Linguagem de programação |
| NestJS | Framework backend |
| Prisma ORM | Comunicação com o banco de dados |
| PostgreSQL / SQLite | Banco de dados relacional, conforme configuração |
| JWT | Autenticação e autorização |
| class-validator | Validação de dados |
| Swagger | Documentação da API |
| Git e GitHub | Versionamento e colaboração |

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura modular baseada na estrutura do NestJS.

**Fluxo principal:**

```text
Requisição HTTP
      ↓
Controller
      ↓
Service
      ↓
Prisma ORM
      ↓
Banco de Dados
      ↓
Resposta HTTP
```

### Organização das camadas

- **Module:** organiza e registra os componentes de cada funcionalidade.
- **Controller:** recebe e direciona as requisições HTTP.
- **Service:** concentra as regras de negócio.
- **DTO:** define e valida os dados recebidos.
- **Prisma:** realiza as operações no banco de dados.
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

*Estrutura resumida dos principais diretórios e módulos.*

## ⚙️ Instalação

Clone o repositório:

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

Crie o arquivo `.env` utilizando o `.env.example` como referência.

Configure as variáveis necessárias para o ambiente, incluindo a conexão com o banco de dados e as configurações de autenticação.

> Não compartilhe arquivos `.env` ou credenciais de acesso no repositório.

Após configurar o ambiente, execute os comandos de configuração do Prisma conforme as instruções do projeto.

## ▶️ Executando a aplicação

Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Para executar em produção:

```bash
npm run start:prod
```

Por padrão, a API utilizada no desenvolvimento pode ser acessada em:

```text
http://localhost:3000
```

## 🌐 Endpoints

As rotas abaixo representam as funcionalidades documentadas da API. As rotas versionadas utilizam o prefixo `/v1`.

### 👤 Users

| Método | Rota | Descrição |
|---|---|---|
| GET | `/users` | Lista usuários |
| GET | `/users/:id` | Busca usuário por ID |
| POST | `/users` | Cria usuário |
| PUT | `/users/:id` | Atualiza usuário |
| DELETE | `/users/:id` | Remove usuário |

### 🔐 Auth

Módulo responsável pela autenticação dos usuários e geração de tokens de acesso.

As rotas de autenticação devem ser consultadas na implementação do módulo `auth`.

### 🛍️ Products

Módulo responsável pelo gerenciamento dos produtos disponíveis na plataforma.

As operações incluem o gerenciamento de informações e disponibilidade dos produtos.

### 🛒 Carts

Módulo responsável pelo gerenciamento do carrinho de compras dos usuários autenticados.

Todas as rotas do carrinho exigem autenticação JWT.

| Método | Rota | Descrição |
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

#### Atualizar quantidade

**PUT** `/v1/carts/:productId`

Corpo da requisição:

```json
{
  "quantity": 2
}
```

#### Funcionalidades do carrinho

- Associação dos itens ao usuário autenticado.
- Verificação da existência e disponibilidade dos produtos.
- Verificação do estoque disponível.
- Atualização da quantidade dos itens.
- Remoção individual de produtos.
- Limpeza completa do carrinho.

## 🔒 Segurança

A API utiliza mecanismos de segurança para proteger os dados e controlar o acesso às funcionalidades.

Entre os recursos implementados estão:

- Autenticação utilizando JWT.
- Proteção de rotas por Guards.
- Validação de dados utilizando DTOs e class-validator.
- Configuração de variáveis de ambiente.
- Controle de acesso às funcionalidades autenticadas.

## 🧪 Testes

Durante o desenvolvimento, as requisições podem ser testadas utilizando ferramentas como Postman.

Também é possível verificar a compilação do projeto com:

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

Para manter o histórico de alterações organizado, utilizamos o padrão de commits:

| Prefixo | Finalidade |
|---|---|
| `feat` | Nova funcionalidade |
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

As contribuições são realizadas por meio de branches e Pull Requests.

Fluxo sugerido:

```bash
git checkout -b feature/nova-funcionalidade
git add .
git commit -m "feat: descrição da funcionalidade"
git push origin feature/nova-funcionalidade
```

Após o envio, abra um Pull Request para revisão das alterações pela equipe.

## 👥 Equipe de desenvolvimento

| Integrante | GitHub |
|---|---|
| Marcelo Henrique | [@marcelohasilva](https://github.com/marcelohasilva) |
| Ricardo João | [@RicardoNsm](https://github.com/RicardoNsm) |
| Gabriel Lopes | [@Gabriel-lopes06](https://github.com/Gabriel-lopes06) |
| Thiago Ruan | [@ThyagoRuan](https://github.com/ThyagoRuan) |

---

<p align="center">
  Desenvolvido em equipe como parte do projeto MarketHub.
</p>
