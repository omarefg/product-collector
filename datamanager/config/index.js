require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || 27017,
  dbConnection: process.env.DB_CONNECTION || "mongodb+srv",
  apiMercadolibre: process.env.API_MERCADOLIBRE || "",
  apiNormalizacion: process.env.NORMALIZACION_API,
  apiKeyToken: process.env.API_KEY_TOKEN || "",
  rabbitMQ: process.env.RABBITMQ_HOST,
  backendProductsApi: process.env.BACKEND_PRODUCTS_API,
  token: process.env.token || null,
  authKey: process.env.AUTH_KEY || "",
  target: process.env.TARGET || "",
};

module.exports = { config };