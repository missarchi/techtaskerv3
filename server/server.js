const dotenv = require('dotenv');
const express = require('express');
const unless = require('express-unless');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const userRoute = require('./Routes/userRoute');
const boardRoute = require('./Routes/boardRoute');
const listRoute = require('./Routes/listRoute');
const cardRoute = require('./Routes/cardRoute');
const auth = require('./Middlewares/auth');

dotenv.config();
const app = express();

// Passport configuration
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());

app.use(cors());
app.use(express.json());

// AUTH VERIFICATION AND UNLESS

auth.verifyToken.unless = unless;

app.use(
  auth.verifyToken.unless({
    path: [
      { url: '/user/login', methods: ['POST'] },
      { url: '/user/register', methods: ['GET', 'POST'] }, // Add 'POST' here
    ],
  })
);

//MONGODB CONNECTION

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection is successful!');
  })
  .catch((err) => {
    console.log(`Database connection failed!`);
    console.log(`Details : ${err}`);
  });

//ROUTES

app.use('/user', userRoute);
app.use('/board', boardRoute);
app.use('/list', listRoute);
app.use('/card', cardRoute);

app.get('/user/register', passport.authenticate('auth0', {
  scope: 'openid email profile'
}));

app.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/failure'
}), function (req, res) {
  // Here you can handle the user profile returned by Auth0
  // For example, you can create a new user in your database with this profile information
  res.redirect('/success');
});

const port = process.env.PORT || 3001; // Use 3000 as the default port

app.listen(port, () => {
  console.log(`Server is online! Port: ${port}`);
});