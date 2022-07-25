const express = require('express');
const { isPrivate, isPublic } = require('../middlewares');
const {
  logIn,
  signUp,
  logInSession,
  logOut,
} = require('../controller/userController');
const routes = require('../routes');

const userRouter = express.Router();

userRouter.post(routes.logIn, isPublic, logIn);
userRouter.post(routes.signUp, isPublic, signUp);
userRouter.get(routes.root, logInSession);
userRouter.get(routes.logOut, isPrivate, logOut);
module.exports = userRouter;
