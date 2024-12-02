FROM node:16 AS build
WORKDIR /app

# Copiar os arquivos de dependência
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código do backend
COPY . .

# Expor a porta em que o backend estará ouvindo
EXPOSE 3000

# Rodar o servidor em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]