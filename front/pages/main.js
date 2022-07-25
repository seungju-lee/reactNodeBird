import React, { useEffect } from 'react';
import { Box, Grid, Hidden } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/appLayout';
import PostForm from '../components/main/postForm';
import PostCard from '../components/main/postCard';
import UserCard from '../components/main/userCard';
import { LOAD_POSTS_REQUEST, LOGIN_SESSION_REQUEST } from '../actions';
import wrapper from '../store/configureStore';

const MAIN = () => {
  const { user } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    state => state.post,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScrolling() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({ type: LOAD_POSTS_REQUEST });
        }
      }
    }

    window.addEventListener('scroll', onScrolling);
    return () => {
      window.removeEventListener('scroll', onScrolling);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  if (!user) {
    return (
      <AppLayout>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {mainPosts.map(post => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Grid container spacing={5}>
        <Hidden mdDown>
          <Grid item sm={2}>
            <UserCard />
          </Grid>
        </Hidden>
        <Grid item container sm>
          <Grid item xs={12}>
            <PostForm />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              {mainPosts.map(post => (
                <Box key={post.id}>
                  <PostCard post={post} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOGIN_SESSION_REQUEST,
      });
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default MAIN;
