FROM node:14-alpine

RUN apk update

WORKDIR /app

ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV RAPIDS_URL=${RAPIDS_URL}

CMD [ "npm", "run", "start" ]
