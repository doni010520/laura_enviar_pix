# 🚀 Guia Rápido de Deploy

## Passo 1: Preparar GitHub

```bash
# Inicializar git
git init
git add .
git commit -m "Initial commit: PIX app"

# Adicionar remote (substitua com seu repositório)
git remote add origin https://github.com/seu-usuario/pix-app.git
git branch -M main
git push -u origin main
```

## Passo 2: Configurar n8n

1. Acesse seu n8n
2. Importe o workflow: `n8n-workflow-example.json`
3. Configure o Google Sheets (ou outro destino)
4. Ative o workflow
5. Copie a URL do webhook (será algo como: `https://seu-n8n.com/webhook/pix-cadastro`)

## Passo 3: Deploy no Easypanel

### Via Interface:

1. Acesse Easypanel
2. **Create Service** → **GitHub**
3. Selecione o repositório `pix-app`
4. Configurações:
   - Name: `pix-app`
   - Build Type: `Dockerfile`
   - Port: `3000`
5. **Environment Variables**:
   ```
   N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/pix-cadastro
   PORT=3000
   ```
6. Clique em **Deploy**

### Verificar Deploy:

1. Aguarde o build finalizar (2-5 minutos)
2. Acesse a URL fornecida pelo Easypanel
3. Teste o formulário

## Passo 4: Testar

1. Abra a aplicação
2. Preencha:
   - Número: `(11) 99999-9999`
   - Chave PIX: `teste@example.com`
3. Clique em **Enviar Dados**
4. Verifique no n8n se o webhook recebeu os dados

## 🔍 Debug

### Ver logs no Easypanel:

1. Vá em **Logs** na aplicação
2. Verifique se há erros

### Testar webhook manualmente:

```bash
curl -X POST https://sua-app.easypanel.host/api/pix \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "11999999999",
    "chavePix": "teste@example.com"
  }'
```

## ✅ Checklist Final

- [ ] Repositório no GitHub criado
- [ ] Workflow n8n configurado e ativo
- [ ] URL do webhook copiada
- [ ] Deploy no Easypanel concluído
- [ ] Variável de ambiente N8N_WEBHOOK_URL configurada
- [ ] Aplicação testada e funcionando
- [ ] Dados chegando no n8n corretamente

## 🎉 Pronto!

Sua aplicação está no ar e enviando dados para o n8n!
