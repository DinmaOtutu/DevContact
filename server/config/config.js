const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
