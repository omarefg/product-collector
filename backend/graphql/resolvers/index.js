import Query from './Query';
import Mutation from './Mutation';
const { GraphQLDate } = require('graphql-iso-date');

export default {
  Query,
  Mutation,
  Date: GraphQLDate
};
