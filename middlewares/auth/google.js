require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../models");

passport.serializeUser(function (user, done) {
  done(null, user);
});
// const GOOGLE_CLIENT_ID =
//   "1031799664857-gtbejiap99fsrl5v6pdnhjp248cockqt.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "GBT8mpLilNb3SYbVwYLKPZqt";
// const GOOGLE_CALLBACK_URL = "http://localhost:3000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
