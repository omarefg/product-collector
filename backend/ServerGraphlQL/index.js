import { server } from './server';
import db from './database';

db();

//Server graphql
server.start(({ port }) => {
  console.log(`Server GraphQL running on port ${port}`);
});
