# Build stage para o frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Build stage final
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos do backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production

# Copiar código do backend
COPY backend/ ./

# Copiar build do frontend
COPY --from=frontend-build /app/frontend/dist ../frontend/dist

EXPOSE 3000

CMD ["node", "server.js"]
