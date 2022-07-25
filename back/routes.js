const USER = '/user';
const LOG_IN = '/login';
const SIGN_UP = '/signup';
const LOG_OUT = '/logout';
const ROOT = '/';
const ADD_POST = '/post';
const ADD_COMMENT = '/:postId/addcomment';
const REMOVE_POST = '/:postId/remove';

const routes = {
  user: USER,
  logIn: LOG_IN,
  signUp: SIGN_UP,
  logOut: LOG_OUT,
  root: ROOT,
  addPost: ADD_POST,
  addComment: ADD_COMMENT,
  removePost: REMOVE_POST,
};

module.exports = routes;
