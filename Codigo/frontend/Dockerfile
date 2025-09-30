# Stage 1: Construir a aplicação React/Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Declara um argumento de build para a URL da API, importante para o Vite
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=$VITE_APP_API_URL

# Copia os arquivos de configuração de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código fonte
COPY . .

# Constrói a aplicação Vite para produção
# Isso geralmente gera uma pasta 'dist' com os arquivos estáticos
RUN npm run build

# Stage 2: Servir a aplicação React com Nginx
FROM nginx:alpine

# Copia o arquivo de configuração do Nginx (vamos criar ele no próximo passo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os assets construídos da stage 'builder' para o diretório de serviço do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta padrão do servidor web Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]