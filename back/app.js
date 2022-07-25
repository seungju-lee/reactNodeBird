const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const routes = require('./routes');
const userRouter = require('./routers/userRouter');

const app = express();
const passportConfig = require('./passport');
const postRouter = require('./routers/postRouter');

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: 'http://nodebird.com',
      credentials: true,
    }),
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.user, userRouter);
app.use(routes.addPost, postRouter);

module.exports = app;
