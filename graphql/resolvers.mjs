import db from '../model/db-utils.mjs';
import auth from '../loaders/authorization.mjs';


const resolvers = {
  Query: {
    user: (parent, args) => (db.getUserById(args.id) || db.getUserByUsername(args.username)),
    users: () => db.getUsers(),
    tweet: (parent, args) => db.getTweetById(args.id),
    tweets: (parent, args) => {
      return (!args ? db.getTweets() :
        (args.username ? db.getTweetsByUsername(args.username) :
          db.getTweetsByUserId(args.user_id)));
    }
  },
  Mutation: {
    postTweet: async (parent, args, context) => {
      if (context.isUnauthenticated()) {
        throw new Error(`User must be logged in to tweet!`);
      }
      //authorize user, ensure is user_id on tweet
      if (context.isAuthenticated() && (context.getUser().id !== args.user_id)) {
        throw new Error(`A different user is already in session.`);
      }
      const tweet = {
        id: db.getTweets().length + 1,
        text: args.text,
        user_id: args.user_id
      };
      db.postTweet(tweet);
      return tweet;
    },
    editTweet: async (parent, args, context) => {
      if (context.isUnauthenticated()) {
        throw new Error(`User must be logged in to tweet!`);
      }
      const existingTweet = db.getTweetById(args.id);
      //authorize user, ensure is user_id on tweet
      if (context.isAuthenticated() && (context.getUser().id !== existingTweet.user_id)) {
        throw new Error(`User cannot edit a different user's tweet.`);
      }
      const newTweet = {
        id: args.id,
        text: args.text,
        user_id: existingTweet.user_id
      };
      db.editTweet(newTweet);
      return newTweet;
    },
    deleteTweet: async (parent, args, context) => {
      if (context.isUnauthenticated()) {
        throw new Error(`User must be logged in to tweet!`);
      }
      //authorize user, ensure is user_id on tweet
      if (context.isAuthenticated() && (context.getUser().id !== db.getTweetById(args.id).user_id)) {
        throw new Error(`User cannot delete a different user's tweet.`);
      }
      return db.deleteTweet({
        id: args.id
      })
    },
    logout: async (parent, args, context) => {
      await context.logout();
      return context.isUnauthenticated();
    },
    register: async (parent, {
      username,
      password
    }, context) => {
      if (context.isAuthenticated() && (context.getUser().username !== username)) {
        throw new Error(`A different user is already in session.`);
      }
      const userWithEmailAlreadyExists = !!db.getUserByUsername(username);
      if (userWithEmailAlreadyExists) {
        throw new Error(`User with username ${username} already exists.`);
      }
      // validate username as valid email address or phone number
      if (!auth.validateUsername(username)) {
        throw new Error(`Not a valid email or phone number: ${username}. \n
          Must be 10 digits, include country code.`);
      }

      try {
        const newUser = {
          id: db.getUsers().length + 1,
          username: username,
          password: await auth.hashPassword(password, 10)
        };
        db.addUser(newUser);
        await context.authenticate("graphql-local", {
          username,
          password
        });
        await context.login(newUser);
        return {
          session_id: context.req.sessionID,
          user: db.getUserById(newUser.id)
        };
      } catch (e) {
        console.log(e);
      }
    },
    login: async (parent, {
      username,
      password
    }, context) => {
      if (context.isAuthenticated() && (context.getUser().username !== username)) {
        throw new Error(`A different user is already in session.`);
      }

      try {
        const {
          user
        } = await context.authenticate("graphql-local", {
          username,
          password
        });
        await context.login(user);
        return {
          session_id: context.req.sessionID,
          user: user
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
};


export default resolvers;
