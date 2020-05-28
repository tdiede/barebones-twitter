import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
};

import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
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
  app.use(cors());
  app.use(morgan('dev'));
  app.enable('trust proxy');
  app.use(bodyParser.json())

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }));

  auth.configurePassport(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/graphql', graphqlHTTP(async (req, res, params) => ({
    schema: schema,
    rootValue: {},
    context: buildContext({ req, res, params }),
    graphiql: (process.env.NODE_ENV !== 'production')
  })));
};


export default expressLoader;
