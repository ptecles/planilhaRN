# 🚀 Guia Completo de Deploy

## 📋 Pré-requisitos

1. Conta no GitHub (para hospedar o código)
2. Conta no Render.com (backend - gratuito)
3. Conta no Netlify (frontend - gratuito)
4. Seu arquivo CSV de temperaturas

---

## 🗂️ Passo 1: Preparar o Repositório GitHub

### 1.1 Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome: `calculadora-enxoval`
3. Deixe público ou privado
4. Clique em "Create repository"

### 1.2 Subir o código
No terminal, na pasta do projeto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/calculadora-enxoval.git
git push -u origin main
```

### 1.3 Adicionar o CSV
1. Coloque seu arquivo CSV em `backend/data/temperaturas.csv`
2. Certifique-se que tem as colunas: `UF`, `Cidade`, `Mes`, `TempMin`, `TempMax`
3. Commit e push:

```bash
git add backend/data/temperaturas.csv
git commit -m "Add temperature data"
git push
```

---

## 🖥️ Passo 2: Deploy do Backend no Render.com

### 2.1 Criar conta
1. Acesse https://render.com
2. Clique em "Get Started for Free"
3. Faça login com GitHub

### 2.2 Criar Web Service
1. No dashboard, clique em "New +" → "Web Service"
2. Conecte seu repositório GitHub `calculadora-enxoval`
3. Clique em "Connect"

### 2.3 Configurar o serviço

**Configurações básicas:**
- **Name**: `enxoval-backend` (ou qualquer nome)
- **Region**: Escolha a mais próxima (ex: Ohio)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Plano:**
- Selecione **Free** (gratuito)

### 2.4 Deploy
1. Clique em "Create Web Service"
2. Aguarde o deploy (3-5 minutos)
3. Quando aparecer "Live", copie a URL (ex: `https://enxoval-backend.onrender.com`)

### 2.5 Testar
Acesse no navegador:
```
https://SEU-APP.onrender.com/api/health
```

Deve retornar: `{"status":"ok","dataLoaded":true}`

---

## 🌐 Passo 3: Deploy do Frontend no Netlify

### 3.1 Criar conta
1. Acesse https://app.netlify.com
2. Clique em "Sign up" e conecte com GitHub

### 3.2 Importar projeto
1. Clique em "Add new site" → "Import an existing project"
2. Escolha "Deploy with GitHub"
3. Autorize o Netlify
4. Selecione o repositório `calculadora-enxoval`

### 3.3 Configurar build

**Build settings:**
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

**Environment variables** (IMPORTANTE):
1. Clique em "Show advanced"
2. Clique em "New variable"
3. Adicione:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://SEU-APP.onrender.com` (URL do Render sem barra no final)

### 3.4 Deploy
1. Clique em "Deploy site"
2. Aguarde o build (2-3 minutos)
3. Quando terminar, clique na URL gerada (ex: `https://random-name-123.netlify.app`)

### 3.5 Personalizar domínio (opcional)
1. Vá em "Site settings" → "Domain management"
2. Clique em "Options" → "Edit site name"
3. Escolha um nome: `calculadora-enxoval.netlify.app`

---

## ✅ Passo 4: Testar o Sistema Completo

1. Acesse sua URL do Netlify
2. Preencha os campos:
   - **UF**: Escolha um estado
   - **Cidade**: Escolha uma cidade
   - **Mês DPP**: Escolha um mês
3. Clique em "Calcular Enxoval"
4. Deve aparecer a tabela com as temperaturas e quantidades

---

## 🔧 Troubleshooting

### Erro: "Nenhum dado encontrado"
- Verifique se o CSV foi enviado para o GitHub
- Confirme que está em `backend/data/temperaturas.csv`
- Verifique os nomes das colunas no CSV

### Erro de CORS
- Certifique-se que a URL do backend no Netlify está correta
- Não coloque `/` no final da URL
- Exemplo correto: `https://enxoval-backend.onrender.com`
- Exemplo errado: `https://enxoval-backend.onrender.com/`

### Backend não carrega dados
- Vá no dashboard do Render
- Clique no seu serviço
- Vá em "Logs"
- Procure por erros

### Frontend não conecta ao backend
1. No Netlify, vá em "Site settings" → "Environment variables"
2. Verifique se `VITE_API_URL` está configurada
3. Se alterar, vá em "Deploys" → "Trigger deploy" → "Clear cache and deploy"

---

## 🔄 Atualizações Futuras

Sempre que fizer alterações no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

- **Render**: Faz deploy automático
- **Netlify**: Faz deploy automático

Para atualizar apenas o CSV:
```bash
git add backend/data/temperaturas.csv
git commit -m "Update temperature data"
git push
```

---

## 💰 Custos

- **GitHub**: Gratuito
- **Render.com**: Gratuito (pode dormir após 15min de inatividade)
- **Netlify**: Gratuito (100GB bandwidth/mês)

**Total: R$ 0,00/mês** 🎉

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no Render e Netlify
2. Teste o backend diretamente: `https://seu-app.onrender.com/api/health`
3. Verifique se as variáveis de ambiente estão corretas
