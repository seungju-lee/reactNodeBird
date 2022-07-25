import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  LOGIN_SESSION_REQUEST,
  LOGIN_SESSION_SUCCESS,
  LOGIN_SESSION_FAILURE,
} from '../actions';

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log(result);
    yield put({ type: LOGIN_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, error: error.response.data });
  }
}

function logInSessionAPI() {
  return axios.get('/user');
}

function* loginSession() {
  try {
    const result = yield call(logInSessionAPI);
    yield put({ type: LOGIN_SESSION_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOGIN_SESSION_FAILURE, data: error.response.data });
  }
}

function logOutAPI() {
  return axios.get('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, data: error.response.data });
  }
}

function signUpAPI(data) {
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({ type: SIGNUP_SUCCESS });
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, data: error.response.data });
  }
}

function* follow(action) {
  try {
    yield delay(1000);
    yield put({ type: FOLLOW_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: FOLLOW_FAILURE, data: error.response.data });
  }
}

function* unFollow(action) {
  try {
    yield delay(1000);
    yield put({ type: UNFOLLOW_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: UNFOLLOW_FAILURE, data: error.response.data });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

function* watchLoginSession() {
  yield takeLatest(LOGIN_SESSION_REQUEST, loginSession);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoginSession),
  ]);
}
