// import { server } from './server';
const db = require('./database');

const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require('cors');
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./graphql/resolvers');

const app = express();
const { config } = require('./config/index');

db();

//definir esquema
const typeDefs = readFileSync(
  join(__dirname, 'graphql/schema.graphql'),
  'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  '/',
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
