require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbHost: process.env.DB_HOST || "",
  dbName: process.env.DB_NAME || "",
  apiMercadolibre: process.env.API_MERCADOLIBRE || "",
  apiNormalizacion: process.env.API_NORMALIZACION || "",
  apiKeyToken: process.env.API_KEY_TOKEN || "",
  target: process.env.TARGET || "http://localhost:3000/api",
  token: process.env.token || null,
};

module.exports = { config };
