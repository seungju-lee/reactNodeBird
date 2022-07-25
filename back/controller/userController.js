const bcrypt = require('bcrypt');
const sql = require('mssql');
const passport = require('passport');

const { connectionPool } = require('../db');

const logInSession = async (req, res, next) => {
  const { user } = req;
  try {
    if (user) {
      const pool = await connectionPool;
      const followList = await pool
        .request()
        .input('userID', sql.Int, user.id)
        .query(
          'select b.id, name from TB_POST as a inner join TB_USER as b on a.userID = b.id ',
        );
      const followingsList = await pool
        .request()
        .input('email', sql.NVarChar, user.email)
        .query(
          'select b.id, name from TB_POST as a inner join TB_USER as b on a.userID = b.id  ',
        );
      delete user.password;
      user.Follows = followList.recordset;
      user.Followings = followingsList.recordset;
      user.Posts = [];
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      if (loginErr) {
        console.log(loginErr);
        return next(loginErr);
      }
      const pool = await connectionPool;
      const followList = await pool
        .request()
        .input('userID', sql.Int, user.id)
        .query(
          'select b.id, name from TB_POST as a inner join TB_USER as b on a.userID = b.id ',
        );
      const followingsList = await pool
        .request()
        .input('email', sql.NVarChar, user.email)
        .query(
          'select b.id, name from TB_POST as a inner join TB_USER as b on a.userID = b.id  ',
        );
      delete user.password;
      user.Follows = followList.recordset;
      user.Followings = followingsList.recordset;
      user.Posts = [];
      return res.status(200).json(user);
    });
  })(req, res, next);
};

const signUp = async (req, res, next) => {
  const pool = await connectionPool;
  try {
    const { email, name, password } = req.body;
    const request = pool.request();
    const result = await request.query('select * from TB_USER');
    if (result.recordset.find(v => v.email === email)) {
      return res.status(401).send('중복된 이메일 정보입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    request.input('email', sql.NVarChar, email);
    request.input('name', sql.NVarChar, name);
    request.input('password', sql.NVarChar, hashedPassword);
    await request.query(
      'insert into TB_USER (email, name, password) values (@email, @name, @password)',
    );
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).send('회원가입 성공');
};

const logOut = (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.send('ok');
  } catch (error) {
    next(error);
  }
};

module.exports = { logIn, signUp, logInSession, logOut };
