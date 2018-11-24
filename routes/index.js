var express = require('express');
var router = express.Router();
const passport = require('passport');
const indexController = require('../controllers/indexController');
const authCheck = require('../config/authCheck');

router.get('/', authCheck, indexController.index);

router.get('/login', (req, res) => {
  if(!req.user){
    res.render('login', {
      user: req.user
    });
  } else {
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
}));

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_basicprofile', 'r_emailaddress']
}));

router.get('/auth/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
  res.redirect('/')
});

router.get('/auth/github', passport.authenticate('github', {
  scope: ['user']
}));

router.get('/auth/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect('/')
});

module.exports = router;
