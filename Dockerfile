FROM node:latest

WORKDIR /usr/src/app

COPY . ./

RUN  apt-get update && apt-get install -y postgresql-client && npm install && chmod +x init.sh

EXPOSE 3000

CMD [ "./init.sh" ]