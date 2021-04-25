import { User } from '../db'
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/authentication/google/callback'
};

// configure the strategy with our config object
const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
  
  // callback function: pull out returned information from Google
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  // if the User exists via GoogleId in the database, then pass user to "done"
  // if the User does not exist, create entry, then pass user to "done"
  User.findOne({where: { googleId: googleId  }})
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, googleId })
          .then(function (user) {
            done(null, user);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);