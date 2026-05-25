# Backend - Calculadora de Enxoval

## 📋 Configuração Local

1. Instalar dependências:
```bash
npm install
```

2. Colocar seu arquivo CSV na pasta `data/`:
```
backend/data/temperaturas.csv
```

3. Rodar o servidor:
```bash
npm run dev
```

## 📊 Formato do CSV

O CSV deve ter as seguintes colunas (os nomes podem variar):
- `UF` - Sigla do estado (ex: RN, SP, RJ)
- `Cidade` - Nome da cidade
- `Mes` - Mês (ex: Janeiro, Fevereiro)
- `TempMin` ou `temp_min` - Temperatura mínima
- `TempMax` ou `temp_max` - Temperatura máxima

Exemplo:
```csv
UF,Cidade,Mes,TempMin,TempMax
RN,Natal,Janeiro,24,32
RN,Natal,Fevereiro,24,31
SP,São Paulo,Janeiro,18,28
```

## 🚀 Deploy no Render.com

1. Criar conta em https://render.com
2. Conectar seu repositório GitHub
3. Criar novo **Web Service**
4. Configurações:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Adicionar o arquivo CSV na pasta `data/` antes do deploy

## 📡 Endpoints

### `GET /api/health`
Verifica status do servidor

### `POST /api/calculate`
Calcula enxoval baseado em temperatura
```json
{
  "uf": "RN",
  "cidade": "Natal",
  "mesDPP": "Janeiro"
}
```

### `GET /api/ufs`
Lista todas as UFs disponíveis

### `GET /api/cidades/:uf`
Lista cidades de uma UF específica
