import pkg from 'graphql';
import queries from './queries';
import mutations from './mutations';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = pkg;


const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: queries
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: mutations
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: "A user",
  fields: () => ({
    id: {
      type: GraphQLInt!
    },
    username: {
      type: GraphQLString!
    }
  })
})

const TweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: "A tweet",
  fields: () => ({
    id: {
      type: GraphQLInt!
    },
    user_id: {
      type: GraphQLInt!
    },
    text: {
      type: GraphQLString!
    }
  })
})

const AuthPayload = new GraphQLObjectType({
  name: 'Auth',
  description: 'Contains caller information',
  fields: () => ({
    session_id: {
      type: GraphQLString!
    },
    user: {
      type: UserType!
    }
  })
})


export default {
  RootQueryType,
  RootMutationType,
  UserType,
  TweetType,
  AuthPayload
};
