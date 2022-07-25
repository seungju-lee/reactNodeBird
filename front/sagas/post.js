import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LOAD_POSTS_REQUEST,
  REMOVE_POST_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
} from '../actions';
import { generateDummyPost } from '../reducers/post';

function addPostApi(data) {
  return axios.post('/post/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostApi, action.data);
    yield put({ type: ADD_POST_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: ADD_POST_FAILURE, data: error.response.data });
  }
}

function addCommentApi(data) {
  return axios.post(`/post/${data.postId}/addComment`, data);
}

function* addComment(action) {
  const result = yield call(addCommentApi, action.data);
  try {
    yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: ADD_COMMENT_FAILURE, data: error.response.data });
  }
}

function* loadsPosts() {
  yield delay(1000);
  try {
    console.log('포스트생성');
    yield put({ type: LOAD_POSTS_SUCCESS, data: generateDummyPost(10) });
  } catch (error) {
    yield put({ type: LOAD_POSTS_FAILURE, data: error.response.data });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}/remove`);
}

function* removePosts(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({ type: REMOVE_POST_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: REMOVE_POST_FAILURE, data: error.response.data });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadsPosts);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePosts);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadPosts),
    fork(watchRemovePost),
  ]);
}
