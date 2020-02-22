require('dotenv').config();

const config = {
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbHost: process.env.DB_HOST || "",
  dbName: process.env.DB_NAME || "",
  apiMercadolibre: process.env.API_MERCADOLIBRE || ""
};

module.exports = { config };
