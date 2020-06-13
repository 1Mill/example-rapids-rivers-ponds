FROM node:14-alpine

RUN apk update

WORKDIR /app

ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV \
	HOST=0.0.0.0 \
	PORT=8080 \
	VUE_APP_RAPIDS_PROXY_URL=${VUE_APP_RAPIDS_PROXY_URL}

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
