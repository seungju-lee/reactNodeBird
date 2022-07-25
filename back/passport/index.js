const passport = require('passport');
const local = require('./local');

const { connectionPool } = require('../db');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const pool = await connectionPool;
      const request = pool.request();
      const result = await request.query('select * from TB_USER');
      const findUser = result.recordset.find(v => v.id === id);
      done(null, findUser); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
