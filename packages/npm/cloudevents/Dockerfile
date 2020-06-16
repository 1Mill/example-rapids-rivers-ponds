FROM node:14-alpine

RUN apk update

WORKDIR /app

ENV NODE_ENV=test
COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "test" ]
