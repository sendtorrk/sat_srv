# Simple Asset Tracker

Simple Asset Tracker consist of three different projects:

* Server
* UI
* Mobile App

This is the server project and powered by:

* NodeJS
* Express
* Postgres
* Sequelize
* Jasmine

## Database Migration

### Test Database

cd services/db

```
NODE_ENV=test npx sequelize db:drop
NODE_ENV=test npx sequelize db:create
NODE_ENV=test npx sequelize db:migrate
```

### Development Database

cd services/db

```
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
```

## Run Tests

From the top-level directory:

```
npm test
```

## Run Server

From the top-level directory:

```
node app
```

## REST APIs

### Check Server Status

```
http://localhost:8081/api/v1/
```
