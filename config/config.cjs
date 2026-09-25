module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_KEY,
    "host": process.env.DB_SERVER,
    "port": process.env.DB_PORT,
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
    "username": "avnadmin",
    "password": "AVNS_H0CvJHTC7qukbOZkBIO",
    "database": "defaultdb",
    "host": "hope-prod-hope.b.aivencloud.com",
    "port": "17589",
    "dialect": "mysql"
  }
}
