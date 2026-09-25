module.exports = {
  "development": {
    "username": "root",
    "password": "hope2023",
    "database": "hope",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_KEY,
    "host": process.env.DB_SERVER,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_KEY,
    "host": process.env.DB_SERVER,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  }
}
