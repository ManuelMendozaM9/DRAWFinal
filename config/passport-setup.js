const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  User.findById(id).then( (user) => {
    done(null, user);
  });
});

passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, (req, email, password, done) => {
  User.findOne({
    _email: email
  }).then( (currentUser) => {
    if(!currentUser)
      return done(null, false, { message: 'Incorrect Email.' });
    if(!currentUser.validPassword(currentUser, password))
      return done(null, false, { message: 'Incorrect password.' });
    return done(null, currentUser);
  }).catch( err =>{
    return done(null, false, { message: 'Algo Salio mal' });
  });
}));

passport.use('signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, (req, email, password, done) => {
  User.findOne({
    _email: email
  }).then( (currentUser) => {
    if (currentUser) {
      return done(null, false);
    } else {
      let newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save().then( (newUser) => {
        done(null, newUser)
      }).catch( err =>{
        return done(null, false, { message: 'Algo Salio mal' });
      });
    }
  }).catch( err =>{
    return done(null, false, { message: 'Algo Salio mal' });
  });
}));

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({
    _email: profile.emails[0].value
  }).then( (currentUser) => {
    if(currentUser){
      currentUser.googleId = profile.id;
      currentUser.save()
      .then( user => {
        done(null, currentUser);
      }).catch( err =>{
        return done(null, false, { message: 'Algo Salio mal' });
      });
    } else {
      new User({
        _name: profile.displayName,
        _email: profile.emails[0].value,
        _googleId: profile.id
      }).save().then( (newUser) => {
        done(null, newUser)
      }).catch( err =>{
        return done(null, false, { message: 'Algo Salio mal' });
      });
    }
  });
  }
));

passport.use(new LinkedInStrategy({
    consumerKey: process.env.LINKEDIN_CLIENT_ID,
    consumerSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/auth/linkedin/redirect",
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({
      _email: profile.emails[0].value,
    }).then( (currentUser) => {
      if(currentUser){
        currentUser.linkedinId = profile.id;
        currentUser.save()
        .then( user => {
          done(null, currentUser);
        }).catch( err =>{
          return done(null, false, { message: 'Algo Salio mal' });
        });
      } else {
        new User({
          _name: profile.displayName,
          _email: profile.emails[0].value,
          _linkedinId: profile.id
        }).save().then( (newUser) => {
          done(null, newUser)
        }).catch( err =>{
          return done(null, false, { message: 'Algo Salio mal' });
        });
      }
    });
    }
));

passport.use(new GithubStrategy({
  callbackURL: "http://scrumpro.herokuapp.com/auth/github/redirect",
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({
    _email: profile.emails[0].value,
  }).then( (currentUser) => {
    if(currentUser){
      currentUser._githubId = profile.id;
      currentUser.save()
      .then( user => {
        done(null, currentUser);
      }).catch( err =>{
        return done(null, false, { message: 'Algo Salio mal' });
      });
    } else {
      new User({
        _name: profile.displayName,
        _email: profile.emails[0].value,
        _githubId: profile.id
      }).save().then( (newUser) => {
        done(null, newUser)
      }).catch( err =>{
        return done(null, false, { message: 'Algo Salio mal' });
      });
    }
  });
  }
));
