import pkg from 'graphql';
import types from './types';
import resolvers from './resolvers';

const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} = pkg;


const mutations = () => ({
  register: {
    type: types.AuthPayload,
    description: 'Register to use the app',
    args: {
      username: {
        type: GraphQLNonNull(GraphQLString)
      },
      password: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.Mutation.register
  },
  logout: {
    type: GraphQLBoolean,
    description: 'Logout for current user',
    resolve: resolvers.Mutation.logout
  },
  login: {
    type: types.AuthPayload,
    description: 'Login to use the app',
    args: {
      username: {
        type: GraphQLNonNull(GraphQLString)
      },
      password: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.Mutation.login
  },
  postTweet: {
    type: types.TweetType,
    description: 'Post a tweet',
    args: {
      text: {
        type: GraphQLNonNull(GraphQLString)
      },
      user_id: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolvers.Mutation.postTweet
  },
  editTweet: {
    type: types.TweetType,
    description: 'Update a tweet',
    args: {
      text: {
        type: GraphQLNonNull(GraphQLString)
      },
      id: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolvers.Mutation.editTweet
  },
  deleteTweet: {
    type: GraphQLBoolean,
    description: 'Delete a tweet',
    args: {
      id: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolvers.Mutation.deleteTweet
  }
});


export default mutations;
