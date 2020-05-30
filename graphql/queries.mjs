import pkg from 'graphql';
import types from './types';
import resolvers from './resolvers';

const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = pkg;


const queries = () => ({
  user: {
    type: types.UserType,
    description: 'A single user',
    args: {
      id: {
        type: GraphQLInt
      },
      username: {
        type: GraphQLString
      }
    },
    resolve: resolvers.Query.user
  },
  tweet: {
    type: types.TweetType,
    description: 'A single tweet',
    args: {
      id: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolvers.Query.tweet
  },
  users: {
    type: new GraphQLList(types.UserType),
    description: 'List of all users',
    resolve: resolvers.Query.users
  },
  tweets: {
    type: new GraphQLList(types.TweetType),
    description: 'List of all tweets, optional by user',
    args: {
      username: {
        type: GraphQLString
      },
      user_id: {
        type: GraphQLInt
      }
    },
    resolve: resolvers.Query.tweets
  }
});


export default queries;
