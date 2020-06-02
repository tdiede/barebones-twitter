import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
};

import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import pkg from 'graphql-passport';
const {
  buildContext
} = pkg;

import schema from '../graphql/schema.mjs';
import auth from './authorization';


const expressLoader = async ({
  expressApp: app
}) => {
  app.use(cors({
    credentials: true
  }));
  app.use(morgan('dev'));
  app.enable('trust proxy');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  auth.configureLocalPassport(passport);
  auth.configureJwtPassport(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  // register endpoint for new users, login for returning users
  app.post('/register',
    passport.authenticate('local', {
      session: false
    }),
    (req, res) => {
      const token = req.authInfo.token;
      // res.cookie('token', token) // save to client
      res.json({
        message: (token ? `ok` : `error`),
        token: (token ? `${token}` : `no token`)
      });
    }
  );

  // graphql endpoint protected by JWT token
  app.use(
    '/graphql',
    passport.authenticate('jwt', {
      session: false
    }),
    graphqlHTTP(async (req, res, params) => ({
      schema: schema,
      rootValue: {},
      context: buildContext({
        req,
        res,
        params
      }),
      graphiql: (process.env.NODE_ENV !== 'production')
    })));
};

export default expressLoader;
