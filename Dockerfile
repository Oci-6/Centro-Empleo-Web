#stage 1
FROM node:lts as node
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/CentroEmpleoWeb /usr/share/nginx/html
