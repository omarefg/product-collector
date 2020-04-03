import { server } from './server';
import db from './database';

db();

server.start({ port: 3000 }, ({ port }) => {
  console.log('Server on port', port);
});
