FROM node:16 AS base
WORKDIR /app

# Copie apenas os arquivos necessários para instalação
COPY package.json package-lock.json ./

# Instale as dependências no contêiner
RUN npm ci

# Copie o restante do código para o contêiner
COPY . .

# Porta para expor o backend
EXPOSE 4000

# Comando padrão (pode ser sobrescrito no docker-compose)
CMD ["npm", "run", "start:dev"]
