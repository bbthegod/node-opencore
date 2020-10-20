require('dotenv').config();

module.exports = {
  ENVIRONMENT: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MASTER_SECRET: process.env.MASTER_SECRET,
  MONGO: process.env.MONGO,
};
