import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
};

import bcrypt from 'bcrypt';
import email from 'email-validator';
import phoneFormat from 'phone';
import PhoneValidator from 'awesome-phonenumber';
import jwt from 'jsonwebtoken';
import pkg from 'passport-jwt';
const {
  Strategy,
  ExtractJwt
} = pkg;
import LocalStrategy from 'passport-local';


const {
  JWT_SECRET,
  JWT_AUDIENCE,  // not used
  JWT_ISSUER  // not used
} = process.env

import db from '../model/db-utils.mjs';

// TODO: Implement full user authentication with email/phone verification


const jwtOptions = {
  algorithms: ['HS256'],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  passReqToCallback: true
};

// generate @ register endpoint
const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: '2h'
  });
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (!err) {
      console.log('Token verified: ', data);
    }
  });
  return token;
};

// strategy for user to register
const configureLocalPassport = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, registerUser));
};

const registerUser = async (req, username, password, done) => {
  // check user already stored in db
  const userAlreadyExists = db.getUserByUsername(username);
  if (!!userAlreadyExists) {
    // check password, hashed and stored in db => login
    const passwordValid = await bcrypt.compare(password, userAlreadyExists.password)
    if (!passwordValid) {
      return done(null, false, {
        message: `Invalid password. Please try again.`
      });
    } else {
      return done(null, userAlreadyExists);
    }
    // duplicate username
    return done(null, false, {
      message: `User with username ${username} already exists.`
    });
  }
  // validate username as valid email address or phone number
  if (!validateUsername(username)) {
    return done(null, false, {
      message: `Not a valid email or phone number: ${username}. \n
      Must be 10 digits, include country code.`
    });
  }
  try {
    const newUser = {
      id: db.getUsers().length + 1,
      username: username,
      password: await hashPassword(password, 10),
      tweets: []
    };
    db.addUser(newUser);
    const token = generateJwtToken({
      id: newUser.id,
      username: newUser.username
    });
    return done(null, newUser, {
      token: token
    });
  } catch (e) {
    console.log(e);
  }
}

// strategy for user in any other interaction
const configureJwtPassport = (passport) => {
  passport.use(
    new Strategy(jwtOptions, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, db.getUserById(id)));
};

const authenticateUser = async (req, jwtPayload, done) => {
  // find user stored in db
  const matchingUser = db.getUserById(jwtPayload.id);
  if (!matchingUser) {
    done(null, false, {
      message: `No matching user found for ${jwtPayload.username} (email or phone). \n
  Please register or login again.`
    });
  } else {
    done(null, matchingUser);
  }
};

const validateUsername = (username) => {
  const [phoneNumber, countryCode] = phoneFormat(username);
  if (phoneNumber !== undefined && countryCode !== undefined) {
    const phone = new PhoneValidator(phoneNumber, countryCode);
    return phone.isValid();
  }
  return email.validate(username);
}

const hashPassword = async (password, salt) => {
  return bcrypt.hash(password, salt);
}


export default {
  configureLocalPassport,
  configureJwtPassport
}
