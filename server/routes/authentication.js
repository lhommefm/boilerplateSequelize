
const express = require('express')
const router = express.Router()
const { db, User } = require('../db');
const passport = require('passport')

// signup route, begins with /authentication
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

// login route, begins with /authentication
router.put('/login', (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email // assumes the login is matching email
      }
    })
      .then(user => {
        if (!user) res.status(401).send('User not found');
        else if (!user.hasMatchingPassword(req.body.password)) { //hasMatchingPassword needs to be defined
          res.status(401).send('Incorrect password')
        }
        else {
          req.login(user, err => {
            if (err) next(err);
            else res.json(user);
          });
        }
      })
      .catch(next);
  });

// logout route, begins with /authenticate
router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});

// fetch the logged-in user on our session to use in updating state, even if they refresh
// Passport attaches the session user to the request object
router.get('/me', (req, res, next) => {
  res.json(req.user);
});

// login with Google, begins with /authenticate
router.get('/google', passport.authenticate('google', { scope: 'email' }));

// login with Google callback, begins with /authenticate
router.get('/google/callback',  passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/authenticate/login'
}));

module.exports = router
