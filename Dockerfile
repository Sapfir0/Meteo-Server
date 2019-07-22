FROM node:carbon AS base
WORKDIR /meteo-server

FROM base AS dependencies  
COPY package*.json ./
RUN npm install

FROM dependencies AS build  
WORKDIR /meteo-server
COPY . /meteo-server


FROM node:9-alpine AS release  
WORKDIR /meteo-server

#RUN  apt-get update && apt-get install -y npm mysql-server mysql-client

COPY --from=dependencies /meteo-server/package.json ./
RUN npm install --only=production \
 && npm cache clean --force
COPY --from=build /meteo-server ./
EXPOSE 5060

#RUN sh ./foo.sh
CMD ["node", "app.js"]