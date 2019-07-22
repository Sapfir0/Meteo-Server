FROM ubuntu:18.04
MAINTAINER Alex Yurev <github.com/Sapfir0>


ENV PACKAGES="\
    git \
    npm \
    nodejs \
    mysql-server \
    mysql-client \
    "

RUN apt-get update \
 && apt-get install --upgrade ${PACKAGES} -qy
 
COPY package*.json /meteoserver/

RUN cd meteoserver \
 && npm install

COPY . /meteoserver

WORKDIR /meteoserver
EXPOSE 5060
ENTRYPOINT ["node"]
CMD ["app.js"]



