require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.REACT_APP_DEVELOPMENT_CONFIG_USERNAME,
    "password": process.env.REACT_APP_DEVELOPMENT_CONFIG_PASSWORD,
    "database": process.env.REACT_APP_DEVELOPMENT_CONFIG_DATABASE,
    "host": process.env.REACT_APP_DEVELOPMENT_CONFIG_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.REACT_APP_TEST_CONFIG_USERNAME,
    "password": process.env.REACT_APP_TEST_CONFIG_PASSWORD,
    "database": process.env.REACT_APP_TEST_CONFIG_DATABASE,
    "host": process.env.REACT_APP_TEST_CONFIG_HOST,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};