require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'find_and_adopt_dev',
    host: process.env.DATABASE_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'find_and_adopt_test',
    host: process.env.DATABASE_HOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres'
  }
}
