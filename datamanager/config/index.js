require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiMercadolibre: process.env.API_MERCADOLIBRE || "",
  apiNormalizacion: process.env.NORMALIZACION_API,
  apiKeyToken: process.env.API_KEY_TOKEN || "",
  rabbitMQ: process.env.RABBITMQ_HOST,
  target: process.env.TARGET || "http://localhost:3001/api",
  token: process.env.token || null,
};

module.exports = { config };