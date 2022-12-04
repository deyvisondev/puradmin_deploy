// load dependencies
require("dotenv/config");
let Sequelize = require("sequelize");
let session = require("express-session");

// initalize sequelize with session store
let SequelizeStore = require("connect-session-sequelize")(session.Store);

// create database, ensure 'sqlite3' in your package.json
let myDataBase = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
  host: process.env.DB_HOST,
  logging: false,
  dialect: "postgres",
  storage: "./session.postgres",
});

let sessionStore = new SequelizeStore({
    db: myDataBase
})




const configSession = (app) => {
  app.use(
    session({
      key: "express.sid",
      secret: "secret",
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {httpOnly: false, secure: false, maxAge: ( 24 * 60 * 60 * 1000 ) // 1 dia
        } 
    })
  );
}
sessionStore.sync()

module.exports = {
  configSession
}