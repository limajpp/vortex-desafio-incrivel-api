# 🌪️ Desafio Incrível - Expenzeus(Vortex)

Bem-vindo à API do Expenzeus, o back-end robusto e escalável responsável por gerenciar todo o ecossistema financeiro do projeto (Web e Mobile).

Esta API foi desenvolvida seguindo os princípios RESTful, utilizando NestJS para garantir modularidade e eficiência, e PostgreSQL para integridade dos dados.

## 🚀 Funcionalidades

### 🔐 Autenticação & Segurança
- **Cadastro de Usuários:** Criação de conta com senha criptografada (bcrypt).
- **Login Seguro:** Autenticação via JWT (JSON Web Tokens).
- **Proteção de Rotas:** Guards globais garantem que apenas usuários autenticados acessem seus dados.
- **Data Sanitization:** Interceptadores removem dados sensíveis (como senhas) das respostas.

### 💰 Gestão de Gastos (CRUD)
- **Criar Despesa:** Registre novos gastos com descrição, valor e data.
- **Listar Despesas:** Visualize seu histórico financeiro.
- **Filtros:** Suporte a filtragem por Ano.
- **Editar Despesa:** Atualize valores ou descrições de lançamentos passados.
- **Excluir Despesa:** Remova lançamentos incorretos.

## 🛠️ Tecnologias Utilizadas
- NestJS
- TypeORM
- PostgreSQL
- Docker / Docker Compose

---

## 🐳 Como Rodar (Docker)

A maneira mais fácil de rodar este projeto é utilizando Docker Compose, que sobe a API e o Banco de Dados com um único comando.

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo
Clone o repositório:
```bash
git clone https://github.com/seu-usuario/vortex-desafio-incrivel-api.git
cd vortex-api
```

Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz baseado no exemplo:
```bash
cp .env.example .env
```

Dica: Para o docker-compose padrão, as configurações do .env.example já funcionam.
Suba os containers:
```bash
docker-compose up --build
```

Acesse a API:

    http://localhost:3000/v1/api

## ⚙️ Como Rodar (Manual / Desenvolvimento)

Se preferir rodar localmente sem Docker (ainda precisará de um Postgres rodando):

Instale as dependências:
```bash
npm install
```

Configure o Banco de Dados(Garanta que você tem um Postgres rodando e atualize o .env com as credenciais).

Inicie o servidor (modo desenvolvimento com hot-reload):
```bash
npm run start:dev
```

Rodar Testes:
```bash
npm run test:e2e
```

🧪 Estrutura do Projeto
```bash
src/
├── auth/           # Módulo de Autenticação (Login, Registro, Guards)
├── expenses/       # Módulo de Despesas (CRUD, Entidade, DTOs)
├── decorators/     # Decorators customizados (ex: validação de Emoji)
├── middleware/     # Interceptadores globais
└── main.ts         # Ponto de entrada da aplicação
```
