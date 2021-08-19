const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../models");

const GOOGLE_CLIENT_ID =
  "1031799664857-gtbejiap99fsrl5v6pdnhjp248cockqt.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "GBT8mpLilNb3SYbVwYLKPZqt";
const CALLBACK_URL = "http://localhost:3000/auth/google/callback";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile._json.email });

      if (!user) {
        const data = {
          username: profile._json.email.split("@")[0],
          fullname: profile._json.name,
          email: profile._json.email,
          password: profile._json.sub,
          photo: profile._json.picture,
        };
        user = await User.create(data);
      }

      return done(null, user);
    }
  )
);
