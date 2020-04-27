import Query from './Query';
import Mutation from './Mutation';
const { GraphQLDate } = require('graphql-iso-date');

module.exports = {
  Query,

  Date: GraphQLDate
};
