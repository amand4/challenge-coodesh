# BASE Exchange - Orders Management

Aplicação web para **criação, visualização e gerenciamento de ordens de compra e venda**, simulando um fluxo simples de exchange/trading.

This is a challenge by Coodesh.

---

# 📌 Sobre o Projeto

O **BASE Exchange** é uma aplicação frontend desenvolvida em **React + TypeScript** que permite criar, listar, visualizar e cancelar ordens de compra e venda de instrumentos financeiros simulados.

O projeto utiliza uma **API mock com JSON Server** para simular persistência de dados.

# 🧰 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **React**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **React Query**
- **React Router DOM**
- **React Hook Form**
- **Yup**
- **Axios**
- **JSON Server** (API mock)
- **ESLint**

# ⚙️ Instalação

Clone o repositório:

```bash
git clone git@github.com:amand4/challenge-coodesh.git
```

Entrar na pasta:

```bash
cd projeto
```

Instale as dependências:

```bash
npm install
```

# ▶️ Como Rodar o Projeto

### 1️⃣ Rodar a API Mock

O projeto utiliza JSON Server para simular uma API REST.

```bash
npm run server
```

A API será iniciada normalmente em:

http://localhost:3001

### 2️⃣ Rodar o Frontend

Execute:

```bash
npm run dev
```

A aplicação estará disponível em:
http://localhost:5173

# 📊 Funcionalidades

A aplicação permite realizar o gerenciamento completo de ordens.

## 📄 Listar ordens

- Tabela com **paginação server-side**
- **Filtros**
- **Ações rápidas**

## ➕ Criar nova ordem

Campos disponíveis:

- Instrumento
- Lado (**Compra / Venda**)
- Preço
- Quantidade

Validação utilizando:

- **React Hook Form**
- **Yup**

## 🔍 Visualizar detalhes da ordem

Página de detalhes contendo:

- ID
- Instrumento
- Lado
- Status
- Preço
- Quantidade
- Data da ordem

## 📜 Histórico da ordem

Modal exibindo o **histórico de execução da ordem**.

## ❌ Cancelar ordem

Disponível apenas para ordens com status:

- **OPEN**
- **PARTIAL**

---

# 🔗 Rotas da Aplicação

| Rota          | Descrição         |
| ------------- | ----------------- |
| `/orders`     | Lista de ordens   |
| `/orders/add` | Criar nova ordem  |
| `/orders/:id` | Detalhes da ordem |

# 🚀 Melhorias Futuras

Algumas melhorias que poderiam ser implementadas em versões futuras do projeto:

## 🧪 Testes

- Adicionar testes unitários utilizando **Jest** e **React Testing Library**
- Implementar testes de integração para fluxos principais da aplicação
- Adicionar testes end-to-end utilizando **Cypress**

## 🎨 Estilização

- Melhorar consistência visual entre componentes
- Criar um sistema de **design tokens** (cores, espaçamento, tipografia)
- Criar componentes de UI mais reutilizáveis

## 🧱 Estrutura de Componentes

- Melhorar organização de componentes reutilizáveis
- Separar componentes de apresentação e lógica
- Criar uma camada de **containers/hooks** para gerenciamento de estado
