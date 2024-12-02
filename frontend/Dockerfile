FROM node:16 AS build
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Rodar o comando de build
RUN npm run build

# Usar Nginx para servir os arquivos do build
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]