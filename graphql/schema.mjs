import pkg from 'graphql';
import types from './types';
import queries from './queries';
import mutations from './mutations';

const {
  GraphQLSchema
} = pkg;

const schema = new GraphQLSchema({
  query: types.RootQueryType,
  mutation: types.RootMutationType
});

export default schema;
