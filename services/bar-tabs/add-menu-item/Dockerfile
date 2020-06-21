FROM node:14-alpine

RUN apk update

WORKDIR /app

ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV \
	DATABASE_URL=${DATABASE_URL} \
	HOST=0.0.0.0 \
	PORT=8080 \
	RAPIDS_URL=${RAPIDS_URL}

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
