FROM node:16.3.0-alpine

WORKDIR /app/frontend
RUN mkdir -p /app
RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .
CMD ["npm","start"]