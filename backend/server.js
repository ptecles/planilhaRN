import express from 'express';
import cors from 'cors';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let temperatureData = [];

function loadCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, 'data', 'temperaturas.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.warn('Arquivo CSV não encontrado. Usando dados de exemplo.');
      resolve([]);
      return;
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`${results.length} linhas carregadas do CSV`);
        resolve(results);
      })
      .on('error', reject);
  });
}

function calculateEnxoval(tempMin, tempMax) {
  const items = [
    { item: 'Body Manga Curta', quantidade: 0 },
    { item: 'Body Manga Longa', quantidade: 0 },
    { item: 'Macacão', quantidade: 0 },
    { item: 'Calça', quantidade: 0 },
    { item: 'Casaquinho', quantidade: 0 },
    { item: 'Meias', quantidade: 0 },
    { item: 'Kit Luva/Touca', quantidade: 0 }
  ];

  if (tempMax < 20) {
    items[0].quantidade = 4;
  } else if (tempMax < 25) {
    items[0].quantidade = 5;
  } else if (tempMax < 30) {
    items[0].quantidade = 7;
  } else if (tempMax < 35) {
    items[0].quantidade = 8;
  } else {
    items[0].quantidade = 9;
  }

  if (tempMin < 10) {
    items[1].quantidade = 11;
    items[2].quantidade = 9;
    items[3].quantidade = 6;
    items[4].quantidade = 2;
    items[5].quantidade = 8;
    items[6].quantidade = 2;
  } else if (tempMin < 13) {
    items[1].quantidade = 10;
    items[2].quantidade = 8;
    items[3].quantidade = 6;
    items[4].quantidade = 2;
    items[5].quantidade = 8;
    items[6].quantidade = 2;
  } else if (tempMin < 15) {
    items[1].quantidade = 9;
    items[2].quantidade = 7;
    items[3].quantidade = 6;
    items[4].quantidade = 0;
    items[5].quantidade = 8;
    items[6].quantidade = 2;
  } else if (tempMin < 18) {
    items[1].quantidade = 8;
    items[2].quantidade = 7;
    items[3].quantidade = 6;
    items[4].quantidade = 0;
    items[5].quantidade = 8;
    items[6].quantidade = 2;
  } else if (tempMin < 20) {
    items[1].quantidade = 7;
    items[2].quantidade = 7;
    items[3].quantidade = 5;
    items[4].quantidade = 0;
    items[5].quantidade = 8;
    items[6].quantidade = 2;
  } else if (tempMin < 25) {
    items[1].quantidade = 6;
    items[2].quantidade = 6;
    items[3].quantidade = 5;
    items[4].quantidade = 0;
    items[5].quantidade = 8;
    items[6].quantidade = 2;
  } else {
    items[1].quantidade = 5;
    items[2].quantidade = 5;
    items[3].quantidade = 5;
    items[4].quantidade = 0;
    items[5].quantidade = 8;
    items[6].quantidade = 1;
  }

  return items;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dataLoaded: temperatureData.length > 0 });
});

app.post('/api/calculate', (req, res) => {
  try {
    const { uf, cidade, mesDPP } = req.body;

    if (!uf || !cidade || !mesDPP) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: uf, cidade, mesDPP' 
      });
    }

    const mesesMap = {
      'janeiro': '1', 'fevereiro': '2', 'março': '3', 'abril': '4',
      'maio': '5', 'junho': '6', 'julho': '7', 'agosto': '8',
      'setembro': '9', 'outubro': '10', 'novembro': '11', 'dezembro': '12'
    };
    
    const mesNumero = mesesMap[mesDPP.toLowerCase()];

    console.log('Buscando:', { uf, cidade, mesDPP, mesNumero });
    console.log('Primeira linha do CSV:', temperatureData[0]);

    const filtered = temperatureData.filter(row => {
      const ufMatch = row.UF?.toUpperCase() === uf.toUpperCase();
      const cidadeMatch = row.Cidade?.toLowerCase() === cidade.toLowerCase();
      const mesMatch = row.Mes?.toLowerCase() === mesDPP.toLowerCase() || 
                       row['Mês DPP'] === mesNumero ||
                       row['MÃªs DPP'] === mesNumero;
      
      return ufMatch && cidadeMatch && mesMatch;
    });

    console.log('Resultados filtrados:', filtered.length);

    if (filtered.length === 0) {
      return res.status(404).json({ 
        error: 'Nenhum dado encontrado para UF, Cidade e Mês informados',
        debug: {
          buscando: { uf, cidade, mesDPP, mesNumero },
          colunas: Object.keys(temperatureData[0] || {})
        }
      });
    }

    const data = filtered[0];
    const tempMin = parseFloat(data.tempmin || data.TempMin || data.temp_min || data['Temp Min'] || 0);
    const tempMax = parseFloat(data.tempmax || data.TempMax || data.temp_max || data['Temp Max'] || 0);

    const enxoval = calculateEnxoval(tempMin, tempMax);

    res.json({
      temperaturas: {
        minima: tempMin,
        maxima: tempMax,
        media: ((tempMin + tempMax) / 2).toFixed(1)
      },
      enxoval
    });

  } catch (error) {
    console.error('Erro ao processar:', error);
    res.status(500).json({ error: 'Erro ao processar dados' });
  }
});

app.get('/api/ufs', (req, res) => {
  const ufs = [...new Set(temperatureData.map(row => row.UF))].filter(Boolean).sort();
  res.json(ufs);
});

app.get('/api/cidades/:uf', (req, res) => {
  const { uf } = req.params;
  const cidades = [...new Set(
    temperatureData
      .filter(row => row.UF?.toUpperCase() === uf.toUpperCase())
      .map(row => row.Cidade)
  )].filter(Boolean).sort();
  res.json(cidades);
});

loadCSV().then(data => {
  temperatureData = data;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Dados carregados: ${temperatureData.length} linhas`);
  });
}).catch(err => {
  console.error('Erro ao carregar CSV:', err);
  process.exit(1);
});
