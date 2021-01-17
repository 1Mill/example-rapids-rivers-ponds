FROM node:12-alpine

RUN apk update

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ARG PORT=8080
ENV \
	HOST=0.0.0.0 \
	NODE_ENV=production \
	PORT=$PORT

COPY . .

RUN ["npm", "run", "start"]
