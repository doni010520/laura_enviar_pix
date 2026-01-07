require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend em produção
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Rota para enviar dados ao webhook n8n
app.post('/api/pix', async (req, res) => {
  try {
    const { numero, chavePix } = req.body;

    // Validação básica
    if (!numero || !chavePix) {
      return res.status(400).json({ 
        success: false, 
        message: 'Número e chave PIX são obrigatórios' 
      });
    }

    // Verificar se o webhook URL está configurado
    if (!process.env.N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL não configurado');
      return res.status(500).json({ 
        success: false, 
        message: 'Webhook não configurado no servidor' 
      });
    }

    // Enviar para o webhook do n8n
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      numero,
      chavePix,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos
    });

    console.log('Dados enviados com sucesso ao n8n:', { numero, chavePix });

    res.json({ 
      success: true, 
      message: 'Dados enviados com sucesso!',
      data: response.data
    });

  } catch (error) {
    console.error('Erro ao enviar dados ao n8n:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao processar solicitação. Tente novamente.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    webhookConfigured: !!process.env.N8N_WEBHOOK_URL
  });
});

// Todas as outras rotas retornam o index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Webhook configurado: ${process.env.N8N_WEBHOOK_URL ? 'SIM' : 'NÃO'}`);
});
