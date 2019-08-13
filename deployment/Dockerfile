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

COPY --from=dependencies /meteo-server/package.json ./
RUN npm install --only=production \
 && npm cache clean --force
COPY --from=build /meteo-server ./

ADD setup.sql /docker-entrypoint-initdb.d
COPY wait-for-it.sh /
CMD /wait-for-it.sh db:3306 --npm start
EXPOSE 5060
#CMD ["node", "app.js"]