# Expressjs TypeScript Starter

## This project build with
* Express
* MongoDB
* TypeScript
* Mocha and Chai
* Docker
* Swagger 
* Husky
* SWC

## Get Started

Clone the repo and install the dependencies...

```bash
cd express-typescript-starter
yarn
```

...then start in dev mode

```bash
yarn dev
```

...start in test mode (if you want to run test cases)

```bash
yarn dev:test
```

...start in production mode

```bash
yarn start
```

...build

```bash
yarn build
```

...run test with mocha

```bash
yarn test
```

...if you fetch husky related issues then run

```bash
yarn prepare
```

## Docker 

...run docker for development 

```bash
docker compose up -d
```

...build docker for production 

```bash
docker compose -f docker-compose.prod.yml
```

...stop docker 

```bash
docker compose down
```

```bash
=================================
for more details see package.json
```