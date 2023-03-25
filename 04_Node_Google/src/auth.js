const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true,
}, 
function(request, accessToken, refreshToken, profile, done) {
    return done(err, profile);
}
))

passport.serializeUser(function(user, done) {
    done(null, user);
})