// import faker from 'faker';
// import shortId from 'shortid';
import produce from 'immer';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOGIN_SESSION_FAILURE,
  LOGIN_SESSION_REQUEST,
  LOGIN_SESSION_SUCCESS,
} from '../actions';

const initialState = {
  logInSessionLoading: false,
  logInSessionDone: false,
  logInSessionError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  followLoading: false,
  followError: null,
  followDone: false,
  unfollowLoading: false,
  unfollowError: null,
  unfollowDone: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  user: null,
};

// const dummyUser = data => ({
//   ...data,
//   id: 1,
//   nickname: faker.name.lastName(),
//   Posts: [],
//   Followings: [
//     { id: shortId.generate(), nickname: faker.name.lastName() },
//     { id: shortId.generate(), nickname: faker.name.lastName() },
//   ],
//   Follows: [
//     { id: shortId.generate(), nickname: faker.name.lastName() },
//     { id: shortId.generate(), nickname: faker.name.lastName() },
//   ],
// });

export const loginRequestAction = data => ({
  type: LOGIN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SESSION_REQUEST:
        draft.logInSessionLoading = false;
        draft.logInSessionError = false;
        break;
      case LOGIN_SESSION_SUCCESS:
        draft.logInSessionLoading = false;
        draft.logInSessionDone = true;
        draft.user = action.data;
        break;
      case LOGIN_SESSION_FAILURE:
        draft.logInSessionLoading = false;
        draft.logInSessionError = action.error;
        break;
      case LOGIN_REQUEST:
        draft.logInLoading = false;
        draft.logInError = false;
        break;
      case LOGIN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.user = action.data;
        break;
      case LOGIN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOGOUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOGOUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.user = null;
        break;
      case LOGOUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGNUP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = action.error;
        break;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.user.Followings.push({
          id: action.data.id,
          name: action.data.name,
        });
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.user.Followings = draft.user.Followings.filter(
          v => v.id !== action.data,
        );
        draft.unfollowDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
