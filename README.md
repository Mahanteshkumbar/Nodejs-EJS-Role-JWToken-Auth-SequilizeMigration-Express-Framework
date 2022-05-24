# Nodejs-EJS-Role-JWToken-Auth-SequilizeMigration-Express-Framework materail bootstrap

This is a Node.js v17.6.0 with framewokr Express.js admin panel starter project with Token based authentication and session management, Server Side Error handling, form field validations. Used Sequilize 

Used Sequelize is a promise-based Node.js ORM tool for MySQL Server, You can use migrations to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa.

Genrate models, seeds, migration files with npx sequelize-cli model:generate --name UserHasRole --attributes userId:integer for more information visit sequilize official documentatiom for Sequelize migration section.

# Installation
It is a full Node.js and Express.js and Sequilize Migrations project that you should use as a starter project and implement your own functions.

* Clone the repository with git clone
* modify the config/config.json file for mysql server configuration(username and password)
* Run npm install
* Run npx sequelize-cli db:migrate:all
* Run npx sequelize-cli db:seed:all
* Run npm start
* That's it: launch the main URL and login with default credentials admin@admin.com - 123456
