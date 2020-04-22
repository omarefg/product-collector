require('dotenv').config({path: '../.env'});

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  authKey: process.env.AUTH_KEY,
  normalizacionApi: process.env.NORMALIZACION_API,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  rabbitMQ: process.env.RABBITMQ_HOST,
};

module.exports = { config };
