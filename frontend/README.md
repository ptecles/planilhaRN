# Frontend - Calculadora de Enxoval

## 🚀 Desenvolvimento Local

1. Instalar dependências:
```bash
npm install
```

2. Criar arquivo `.env`:
```bash
cp .env.example .env
```

3. Editar `.env` e configurar a URL do backend:
```
VITE_API_URL=http://localhost:3001
```

4. Rodar o projeto:
```bash
npm run dev
```

Acesse: http://localhost:5173

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos estarão na pasta `dist/`

## 🌐 Deploy no Netlify

### Opção 1: Via Interface Web

1. Acesse https://app.netlify.com
2. Clique em "Add new site" > "Import an existing project"
3. Conecte seu repositório GitHub
4. Configurações:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**:
     - `VITE_API_URL` = URL do seu backend no Render (ex: `https://seu-app.onrender.com`)

### Opção 2: Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🔧 Variáveis de Ambiente

Após o deploy no Netlify, configure:
- `VITE_API_URL`: URL do backend hospedado no Render.com

**Importante**: Sempre que alterar variáveis de ambiente, faça um novo deploy!
