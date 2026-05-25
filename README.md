# 🍼 Calculadora de Enxoval de Bebê

Sistema web para calcular quantidades recomendadas de itens de enxoval baseado nas temperaturas da região e mês de nascimento.

## 📁 Estrutura do Projeto

```
planilhaRN/
├── backend/          # API Node.js + Express
│   ├── data/        # Arquivo CSV com temperaturas
│   ├── server.js    # Servidor principal
│   └── package.json
├── frontend/         # Interface React + Vite
│   ├── src/
│   │   ├── App.jsx  # Componente principal
│   │   └── main.jsx
│   └── package.json
└── DEPLOY.md        # Guia completo de deploy
```

## 🚀 Como Usar

### Desenvolvimento Local

#### Backend
```bash
cd backend
npm install
# Coloque seu CSV em backend/data/temperaturas.csv
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edite .env e configure VITE_API_URL=http://localhost:3001
npm run dev
```

Acesse: http://localhost:5173

### Deploy em Produção

Siga o guia completo em **[DEPLOY.md](./DEPLOY.md)**

**Resumo:**
1. Backend → Render.com (gratuito)
2. Frontend → Netlify (gratuito)
3. CSV → Incluído no repositório

## 📊 Formato do CSV

O arquivo `backend/data/temperaturas.csv` deve ter:

```csv
UF,Cidade,Mes,TempMin,TempMax
RN,Natal,Janeiro,24,32
RN,Natal,Fevereiro,24,31
SP,São Paulo,Janeiro,18,28
```

**Colunas obrigatórias:**
- `UF` - Sigla do estado
- `Cidade` - Nome da cidade
- `Mes` - Mês por extenso
- `TempMin` - Temperatura mínima
- `TempMax` - Temperatura máxima

## 🎨 Funcionalidades

- ✅ Seleção de UF, Cidade e Mês DPP
- ✅ Cálculo automático baseado em temperatura
- ✅ Interface moderna e responsiva
- ✅ Tabela com 6 itens de enxoval
- ✅ Exibição de temperaturas (min, max, média)

## 🛠️ Tecnologias

**Backend:**
- Node.js
- Express
- csv-parser
- CORS

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Lucide Icons

## 📝 Lógica de Cálculo

O sistema calcula a temperatura média e recomenda quantidades baseadas em faixas:

- **≥ 25°C**: Mais roupas leves
- **20-25°C**: Mix de leves e quentes
- **15-20°C**: Mais roupas quentes
- **< 15°C**: Predominância de roupas quentes

## 🌐 URLs

Após o deploy:
- **Frontend**: `https://seu-site.netlify.app`
- **Backend**: `https://seu-app.onrender.com`

## 📄 Licença

MIT
