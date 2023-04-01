FROM node:18-alpine

RUN mkdir /api

WORKDIR /api

EXPOSE 3000

COPY package*.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "start:dev" ]