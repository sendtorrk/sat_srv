# Simple Asset Tracker - Server

A simple application to keep track of your lab assets. It consist of three different projects:

* Server
* UI
* Mobile App

This is the server project and powered by:

* NodeJS
* Express
* Postgres
* Sequelize
* Jasmine

Assets are organized by Teams. A team can have one or more assets. An asset can have one or more notes.

#### Teams

Team has following fields:

* Name
* Owner Email

#### Assets

Asset has following fields:

* Serial
* Model
* Asset Owner Email
* Team ID

#### Asset Notes

Asset note has following fields:

* Note message
* User Email
* Asset ID

## Quick Start

* Install Node
* Install Postgres
* Migrate Database

```
cd services/db

npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
```

* Run

From the top-level directory:

```
npm install
node app
```

## Testing

* Migrate Database

```
cd services/db

NODE_ENV=test npx sequelize db:drop
NODE_ENV=test npx sequelize db:create
NODE_ENV=test npx sequelize db:migrate
```

* Run Tests

From the top-level directory:

```
npm test
```

## REST APIs

### Check Server Status

```
https://localhost:8444/api/v1/
```
