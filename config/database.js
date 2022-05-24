const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodedb', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {    
    console.log('Unable to connect to the database:', err);
    throw new Error(err);
    // const error = new Error(err);
    // error.httpStatusCode = 500;
    // return next(error);
    // resp.render('errors/500',{pageTitle: "Internal Server Error"});
  }

module.exports = sequelize;

// const mysql = require('mysql2');

// const connPool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     port: "3306",
//     database: "nodedb"
// });
 
//  module.exports = connPool.promise();