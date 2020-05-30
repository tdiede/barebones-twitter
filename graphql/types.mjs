import pkg from 'graphql';
import queries from './queries';
import mutations from './mutations';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
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
      type: GraphQLNonNull(GraphQLInt)
    },
    username: {
      type: GraphQLNonNull(GraphQLString)
    },
    tweets: {
      type: GraphQLNonNull(GraphQLList(TweetType))
    }
  })
})

const TweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: "A tweet",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    user: {
      type: GraphQLNonNull(UserType)
    },
    text: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

const AuthPayload = new GraphQLObjectType({
  name: 'Auth',
  description: 'Contains caller information',
  fields: () => ({
    session_id: {
      type: GraphQLNonNull(GraphQLString)
    },
    user: {
      type: GraphQLNonNull(UserType)
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
