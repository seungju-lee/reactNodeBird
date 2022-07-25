const sql = require('mssql');
const { connectionPool } = require('../db');

const addPost = async (req, res, next) => {
  try {
    const { content, id } = req.body;
    const pool = await connectionPool;
    await pool
      .request()
      .input('content', sql.NVarChar, content)
      .input('userID', sql.NVarChar, id)
      .query('insert into TB_POST (userID, content) values(@userID, @content)');
    const result = await pool
      .request()
      .input('userID', sql.Int, id)
      .query(
        'select a.id, content, userID, name from TB_POST as a inner join TB_USER as b on a.userID = b.id where userID = @userID',
      );
    const post = { User: {} };
    result.recordset.forEach(v => {
      if (!post.id) {
        post.id = v.id;
      }
      if (!post.User.id) {
        post.User.id = v.userID;
        post.User.name = v.name;
      }
      if (!post.content) {
        post.content = v.content;
      }
    });
    post.Comments = [];
    post.Images = [];
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { postId, id, content } = req.body;
    const pool = await connectionPool;
    await pool
      .request()
      .input('postId', sql.NVarChar, req.params.postId)
      .input('userId', sql.NVarChar, id)
      .input('comment', sql.NVarChar, content)
      .query(
        'insert into TB_COMMENT (postId, comment, userId) values (@postId, @comment, @userId)',
      );
    const result = {
      postId,
      User: { id: req.user.id, name: req.user.name },
      content,
    };
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const removePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const pool = await connectionPool;
    await pool
      .request()
      .input('postId', sql.NVarChar, postId)
      .input('userId', sql.NVarChar, req.user.id)
      .query(
        'delete from TB_POST where id = @postId and userID = @userId; delete from TB_COMMENT where postId = @postId and userId = @userId',
      );
    res.status(200).json({ postId: parseInt(postId, 10) });
  } catch (error) {
    next(error);
  }
};

module.exports = { addPost, addComment, removePost };
