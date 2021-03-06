FROM node:16.13.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run build & npm run start:prod