# Stage 1: Construir a aplicação TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de configuração de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código fonte
COPY . .

RUN npm run build

# Stage 2: Executar a aplicação compilada
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos JavaScript compilados da stage 'builder'
# A origem agora é /app/build (onde o tsc colocou os arquivos na stage builder).
# O destino é ./build (onde esses arquivos vão ficar no container final).
COPY --from=builder /app/build ./build

# Copia os arquivos de configuração de pacotes e instala APENAS as dependências de produção
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Expõe a porta em que sua aplicação Node.js estará escutando
EXPOSE 3001 

# O arquivo compilado estará diretamente em build/server.js
CMD ["node", "build/server.js"]