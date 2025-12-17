# 🚗 AutoStore - Plataforma de Vendas de Carros

Sistema moderno de gerenciamento e exibição de anúncios de carros usados e seminovos, desenvolvido com **Next.js 16**, **React 19**, **Tailwind CSS v4** e **GraphQL**, com autenticação Firebase e deploy automático no Vercel.

## ✨ Funcionalidades

- 🔍 **Catálogo de Carros** - Listagem com filtros avançados (preço, ano, km) e paginação
- 📄 **Detalhes do Carro** - Página dinâmica com renderização de markdown
- 🔐 **Autenticação** - Login/logout com Firebase Admin e sessões HTTP-only
- 📧 **Formulário de Contato** - Validação completa com máscara de telefone brasileira
- 📱 **Responsivo** - Mobile-first com menu hamburger
- 🚀 **GraphQL API** - Consultas tipadas com graphql-request
- 🎨 **Design Moderno** - Tailwind CSS v4 com componentes reutilizáveis
- 🔄 **ISR** - Regeneração incremental estática para performance otimizada
- ⚡ **SSR + SSG** - Combinação de Server e Client Components

## 🛠 Stack Tecnológico

| Tecnologia     | Versão  | Propósito                   |
| -------------- | ------- | --------------------------- |
| Next.js        | 16.0.10 | Framework React com SSR/SSG |
| React          | 19.2.3  | Biblioteca UI               |
| TypeScript     | 5+      | Type safety                 |
| Tailwind CSS   | 4       | Estilização utility-first   |
| GraphQL        | 16.12   | Query language para API     |
| Firebase Admin | 13.6    | Autenticação backend        |
| Remark         | 15      | Processamento markdown      |
| Gray Matter    | 4       | Parse YAML frontmatter      |

## 📋 Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** 9+ ou **yarn** 3+
- Conta **Firebase** com credenciais de Admin SDK
- _(Opcional)_ Conta **Vercel** para deploy

## 🚀 Quick Start

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/Neto002/pd-jamstack-next-infnet.git
cd pd-jamstack-next-infnet
npm install
```

### 2. Configurar variáveis de ambiente

Criar arquivo `.env.local` na raiz do projeto:

```env
# Firebase Admin SDK (obter em https://console.firebase.google.com/)
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=seu-email@seu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# API GraphQL URL (opcional - use para API em domínio diferente)
# NEXT_PUBLIC_GRAPHQL_URL=https://sua-api.com/graphql

# Bypass de proteção do Vercel (preenchido automaticamente em CI/CD)
# VERCEL_AUTOMATION_BYPASS_SECRET=seu-token-bypass
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) no navegador.

### 4. Build para produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (pages)/              # Rotas de páginas
│   │   ├── page.tsx          # Home com catálogo em destaque
│   │   ├── carros/           # Listagem de carros
│   │   │   ├── view.tsx      # Componente com filtros
│   │   │   └── [slug]/       # Detalhes dinâmicos (markdown)
│   │   ├── login/            # Autenticação
│   │   └── contato/          # Formulário de contato
│   ├── api/
│   │   ├── login/            # POST para autenticação
│   │   ├── logout/           # POST para logout
│   │   ├── auth-status/      # GET status de autenticação
│   │   ├── cars/             # GraphQL endpoint (opcional)
│   │   └── graphql/          # Resolvers GraphQL (se aplicável)
│   ├── components/
│   │   └── layout/           # Header, Footer, LogoutButton
│   ├── services/
│   │   ├── auth/             # Firebase Admin, sessões
│   │   ├── graphql.ts        # Cliente GraphQL
│   │   ├── carro.ts          # Leitura de arquivos markdown
│   │   └── user.ts           # Server actions
│   ├── interfaces/           # Tipos TypeScript
│   ├── globals.css           # Estilos globais (Tailwind v4)
│   └── layout.tsx            # Root layout
├── public/
│   ├── carros/               # Dados em markdown com frontmatter
│   │   └── [carro-slug]/
│   │       └── index.md      # Ex: title, price, images, description
│   └── ...
└── tsconfig.json             # Config TypeScript
```

## 🔑 Fluxos Principais

### Autenticação

1. **Login** (`/login`):

   - User submete email/password
   - API chama Firebase REST API (identitytoolkit)
   - Recebe `idToken`
   - Backend cria session cookie HTTP-only com `createSessionCookie()`
   - Header escuta evento `auth-changed` e atualiza estado
   - Redirect para `/`

2. **Logout** (`LogoutButton`):
   - Chama `/api/logout`
   - Remove session cookie
   - Dispara evento `auth-changed`
   - Header re-verifica via `/api/auth-status`
   - Redirect para `/login`

### Catálogo de Carros

1. **Home** (`/`):

   - Server Component executa query GraphQL (ISR com `revalidate=3600`)
   - Renderiza 3 carros em destaque (fallback se API falhar)
   - Link para `/carros` (listagem completa)

2. **Listagem** (`/carros`):

   - Server passa dados da API GraphQL para `CarrosView` (Client Component)
   - Filtros client-side com `useMemo` (preço, ano, km)
   - Paginação 9 itens por página

3. **Detalhes** (`/carros/[slug]`):
   - Lê arquivo markdown: `public/carros/[slug]/index.md`
   - Parse YAML frontmatter com `gray-matter`
   - Converte markdown HTML com `remark`
   - Renderiza com estilo Tailwind `.prose`

## 🔗 Endpoints GraphQL

### Query: `cars`

```graphql
query {
  cars {
    title
    slug
    price
    year
    km
    hero_image
    hero_image_alt
    description
    features
  }
}
```

**Response:**

```json
{
  "data": {
    "cars": [
      {
        "title": "Honda Civic 2022",
        "slug": "honda-civic-2022",
        "price": 85000,
        "year": 2022,
        "km": 15000,
        "hero_image": "/images/civic.jpg",
        "hero_image_alt": "Honda Civic 2022 frontal",
        "description": "Carro em perfeito estado...",
        "features": ["Ar condicionado", "Direção hidráulica", "4 portas"]
      }
    ]
  }
}
```

## 📊 Validações

### Formulário de Contato

| Campo    | Regra                                              |
| -------- | -------------------------------------------------- |
| Nome     | Obrigatório, não vazio                             |
| Email    | Obrigatório, regex válido                          |
| Telefone | Obrigatório, 11 dígitos, máscara `(XX) XXXXX-XXXX` |
| Mensagem | Obrigatório, mínimo 10 caracteres                  |

## 🔐 Autenticação

- **Backend**: Firebase Admin SDK com sessões seguras
- **Cookies**: HTTP-only, secure (produção), SameSite=Lax
- **Duração**: 5 dias
- **Proteção**: CSRF bypass automático no Vercel (CI/CD)

## 🌐 Deployment no Vercel

### 1. Conectar repositório

1. Ir para [vercel.com](https://vercel.com)
2. Clicar em "New Project"
3. Selecionar repositório GitHub
4. Clicar "Import"

### 2. Configurar variáveis de ambiente

No Vercel Dashboard → Settings → Environment Variables, adicionar:

```
FIREBASE_PROJECT_ID = seu-projeto-id
FIREBASE_CLIENT_EMAIL = seu-email@seu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
NEXT_PUBLIC_GRAPHQL_URL = https://seu-app.vercel.app/api/cars
```

### 3. Deploy

- **Automático**: Cada push para `main` dispara build
- **Preview**: Cada PR gera URL de preview
- **Production**: URL automática `https://seu-app.vercel.app`

## 🛠 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com hot-reload
npm run build    # Build otimizado para produção
npm start        # Inicia servidor de produção
npm run lint     # Verifica código com ESLint
```

## 👨‍💻 Autor

[Neto002](https://github.com/Neto002)

---
