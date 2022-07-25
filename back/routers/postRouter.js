const express = require('express');
const {
  addPost,
  addComment,
  removePost,
} = require('../controller/postController');
const routes = require('../routes');

const postRouter = express.Router();

postRouter.post(routes.addPost, addPost);
postRouter.post(routes.addComment, addComment);
postRouter.delete(routes.removePost, removePost);

module.exports = postRouter;
