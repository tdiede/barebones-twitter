import pkg from 'graphql';
import types from './types';
import resolvers from './resolvers';

const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID
} = pkg;


const mutations = () => ({
  logout: {
    type: GraphQLBoolean,
    description: 'Logout for current user',
    resolve: resolvers.Mutation.logout
  },
  postTweet: {
    type: types.TweetType,
    description: 'Post a tweet',
    args: {
      text: {
        type: GraphQLString
      },
      user_id: {
        type: GraphQLInt
      }
    },
    resolve: resolvers.Mutation.postTweet
  },
  editTweet: {
    type: types.TweetType,
    description: 'Update a tweet',
    args: {
      text: {
        type: GraphQLString
      },
      id: {
        type: GraphQLInt
      }
    },
    resolve: resolvers.Mutation.editTweet
  },
  deleteTweet: {
    type: GraphQLBoolean,
    description: 'Delete a tweet',
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: resolvers.Mutation.deleteTweet
  }
});


export default mutations;
