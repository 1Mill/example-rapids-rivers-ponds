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
	VUE_APP_PRODUCER_URL=${VUE_APP_PRODUCER_URL} \
	VUE_APP_SUBSCRIBER_URL=${VUE_APP_SUBSCRIBER_URL}

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
