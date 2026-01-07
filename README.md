# 📱 Aplicação de Cadastro PIX

Aplicação simples para capturar número de telefone e chave PIX, enviando os dados para um webhook do n8n.

## 🚀 Tecnologias

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Deploy**: Docker + Easypanel

## 📋 Pré-requisitos

- Node.js 18+ (para desenvolvimento local)
- Docker (para deploy)
- Conta no Easypanel configurada na VPS

## 🛠️ Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pix-app.git
cd pix-app
```

### 2. Configure as variáveis de ambiente

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` e adicione a URL do seu webhook n8n:

```env
N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/seu-webhook-id
PORT=3000
```

### 3. Instale as dependências

```bash
# Na raiz do projeto
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Execute em modo de desenvolvimento

```bash
# Na raiz do projeto
npm run dev
```

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🐳 Deploy no Easypanel

### 1. Prepare o repositório

```bash
# Adicione todos os arquivos
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Configure no Easypanel

1. Acesse seu Easypanel
2. Clique em **"Create Service"**
3. Selecione **"GitHub"**
4. Escolha o repositório `pix-app`
5. Configure:
   - **Build Type**: Dockerfile
   - **Dockerfile Path**: `Dockerfile`
   - **Port**: `3000`

### 3. Adicione variáveis de ambiente

No Easypanel, vá em **Environment Variables** e adicione:

```
N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/seu-webhook-id
PORT=3000
```

### 4. Deploy

Clique em **"Deploy"** e aguarde o build finalizar.

## 📡 Webhook n8n

### Estrutura dos dados enviados:

```json
{
  "numero": "11999999999",
  "chavePix": "contato@exemplo.com",
  "timestamp": "2025-01-07T12:00:00.000Z"
}
```

### Configurar no n8n:

1. Crie um novo workflow
2. Adicione um node **Webhook**
3. Configure:
   - **HTTP Method**: POST
   - **Path**: escolha um path único
4. Copie a URL do webhook
5. Use essa URL na variável `N8N_WEBHOOK_URL`

## 🎨 Funcionalidades

- ✅ Validação de campos obrigatórios
- ✅ Formatação automática do número de telefone
- ✅ Feedback visual de sucesso/erro
- ✅ Loading state durante envio
- ✅ Design responsivo
- ✅ Limpeza automática do formulário após sucesso

## 📱 Interface

A aplicação possui um design limpo e moderno com:
- Gradiente roxo de fundo
- Card centralizado e responsivo
- Campos de entrada com validação
- Mensagens de feedback claras
- Botão com estados de loading

## 🔧 Estrutura do Projeto

```
pix-app/
├── backend/
│   ├── server.js          # Servidor Express
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Componente principal
│   │   ├── App.css        # Estilos
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Dockerfile             # Para deploy
├── .dockerignore
├── .gitignore
├── package.json           # Scripts raiz
└── README.md
```

## 🐛 Troubleshooting

### Erro de conexão com o webhook

Verifique se:
1. A URL do webhook está correta no `.env`
2. O webhook n8n está ativo
3. Não há firewall bloqueando a conexão

### Build falhando no Easypanel

1. Verifique os logs de build
2. Confirme que o Dockerfile está correto
3. Verifique se todas as dependências estão no package.json

## 📄 Licença

MIT

## 👤 Autor

Desenvolvido para automação com n8n
