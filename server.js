/**
 * @author Ronaldo Campos
 * @author Lucas Castillo
 */

const express = require("express");
const mongodb = require("./data/database.js");
const cors = require("cors");
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*")
    res.setHeader(
      "Access-Controll-Allow-Headers",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin : "*"}))
  .use("/", require("./routes/index.js"));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accesToken, refreshToken, profile, done) {
    //User.findOrCreate( {githubId: profile.id}, function(err, user) {
      return done(null, profile);
    //})
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`
      <html>
        <head><title>Status</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
          <h1 style="color: green;">✅ Logged in</h1>
          <p>Welcome, <strong>${req.session.user.displayName}</strong>!</p>
          <a href="/logout">Logout</a>
        </body>
      </html>
    `);
  } else {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.send(`
      <html>
        <head><title>Status</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
          <h1 style="color: red;">❌ Logged Out</h1>
          <a href="${baseUrl}/login">Login with GitHub</a>
        </body>
      </html>
    `);
  }
});

app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
)

mongodb.initDb((err) => {
    if(err) {
        console.error("Error connecting to DB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}!\nGood Luck!`)
        })
    }
});