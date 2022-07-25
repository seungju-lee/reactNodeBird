const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const sql = require('mssql');
const { connectionPool } = require('../db');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const pool = await connectionPool;
          const request = pool.request();
          request.input('email', sql.NVarChar, email);
          const result = await request.query(
            'select * from TB_USER where email = @email',
          );
          const user = result.recordset[0];
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 이메일입니다!' });
          }
          const passwordCheck = await bcrypt.compare(password, user.password);
          if (passwordCheck) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
