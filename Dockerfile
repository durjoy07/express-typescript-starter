FROM node:18-alpine AS builder

RUN mkdir /app

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN yarn

COPY . ./

EXPOSE 3030

CMD ["npm", "run", "dev"]