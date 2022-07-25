import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Styles from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import useInput from '../hooks/useInput';
import { SIGNUP_REQUEST } from '../actions';

const PassworStyle = Styles.div`color: red;`;

const AStyled = Styles.a`
  cursor : pointer;
  color : blue;
  text-decoration: none;
`;

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SIGNUP = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { signUpDone } = useSelector(state => state.user);
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (signUpDone) {
      router.push('/login');
    }
  }, [signUpDone]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
      if (e.target.value === '') {
        setPasswordError(false);
      }
    },
    [password],
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        setPasswordError(true);
      }
      if (!term) {
        setTermError(true);
      }
      dispatch({ type: SIGNUP_REQUEST, data: { email, name, password } });
    },
    [name, email, password, term, passwordCheck],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원 가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="닉네임"
                name="name"
                placeholder="닉네임"
                value={name}
                onChange={onChangeName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 확인"
                type="password"
                id="passwordCheck"
                placeholder="비밀번호 확인"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {passwordError && (
                <PassworStyle>비밀번호가 다릅니다.</PassworStyle>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    onChange={onChangeTerm}
                    checked={term}
                  />
                }
                label="약관에 동의 합니다."
              />
              {termError && <PassworStyle>약관동의가 필요합니다.</PassworStyle>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원 가입
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login">
                <AStyled>이미 계정이 있으신가요? 로그인창으로...</AStyled>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SIGNUP;
