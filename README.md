# Simple Asset Tracker - Server

A simple application to keep track of your lab assets. It consist of two different projects:

* [Server](https://github.com/sendtorrk/sat_srv/wiki)
* [UI](https://github.com/sendtorrk/sat_web_ui/wiki)

This is the server project and powered by:

* NodeJS
* Express
* Postgres
* Sequelize
* Jasmine

Assets are organized by Teams. A team can have one or more assets. An asset can have one or more notes.

Team has following fields:

* Name
* Owner Email

Asset has following fields:

* Serial
* Model
* Asset Owner Email
* Team ID

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

## Screenshots
See [Wiki](https://github.com/sendtorrk/sat_srv/wiki) for screen shots
