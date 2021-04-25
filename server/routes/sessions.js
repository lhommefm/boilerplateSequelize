const { db, User } = require('../db'); 
const passport = require('passport')
const express = require('express')
const router = express.Router()
const session = require('express-session');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

// establish the Express session functionality 
router.use(session({
  secret: process.env.SESSON_SECRET || 'better to store secret in an env variable',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

// establish the Passport functionality leveraging Express sessions
router.use(passport.initialize());
router.use(passport.session());

// serialize User after login to place an identifier in the session store
passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (err) {
      done(err);
    }
  });

// deserialize User after each request to get necessary info from db
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done);
});

module.exports = router