import bcrypt from 'bcrypt';
import email from 'email-validator';
import phoneFormat from 'phone';
import PhoneValidator from 'awesome-phonenumber';
import pkg from 'graphql-passport';
const {
  GraphQLLocalStrategy
} = pkg;

import db from '../model/db-utils.mjs';


// TODO: Implement full user authentication with email/phone verification

const configurePassport = (passport) => {
  passport.use(
    new GraphQLLocalStrategy({
      passReqToCallback: true
    }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, db.getUserById(id)));
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

const authenticateUser = async (req, username, password, done) => {
  // check user already stored in db
  const matchingUser = db.getUserByUsername(username);
  if (!matchingUser) {
    return done(null, false, {
      message: `No matching user found for ${username} (email or phone). \n
  Please register or try to login again.`
    });
  }
  // check password, hashed and stored in db
  const passwordValid = await bcrypt.compare(password, matchingUser.password)
  if (!passwordValid) {
    return done(null, false, {
      message: `Invalid password. Please try again.`
    });
  } else {
    return done(null, matchingUser);
  }
}


export default {
  configurePassport,
  authenticateUser,
  validateUsername,
  hashPassword
}
