const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
  clientID: "317295161808-a1vq5v068i9fi58kab2q86dr0v1hir4m.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});