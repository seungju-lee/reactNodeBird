import React, { memo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Repeat from '@material-ui/icons/Repeat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Typography from '@material-ui/core/Typography';
import { Box, Button, CardHeader, IconButton, List } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Comments from './comments';
import CommentForm from './commentForm';
import ImagePost from './ImagePost';
import PostContent from './postContent';
import {
  FOLLOW_REQUEST,
  REMOVE_POST_REQUEST,
  UNFOLLOW_REQUEST,
} from '../../actions';

const useStyles = makeStyles({
  root: {
    maxWidth: 630,
    minWidth: 430,
  },
  media: {
    height: 140,
  },
});

const PostCard = memo(({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [isFollow, setIsFollow] = useState(false);
  const findPostId = user?.Followings.find(v => v.id === post.User.id);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = useCallback(e => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const onClickFavorite = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const [addCommentToggle, setAddCommentToggle] = useState(false);
  const onClickAddComment = useCallback(() => {
    setAddCommentToggle(prev => !prev);
  }, []);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onClickFollow = useCallback(() => {
    if (findPostId) {
      setIsFollow(false);
      dispatch({ type: UNFOLLOW_REQUEST, data: post.User.id });
    } else {
      setIsFollow(true);
      dispatch({
        type: FOLLOW_REQUEST,
        data: { id: post.User.id, name: post.User.name },
      });
    }
  }, [isFollow, findPostId]);

  const onClickRemove = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: post.id });
  }, []);

  return (
    <Card style={{ margin: '20px' }} className={classes.root}>
      {user && (
        <CardHeader
          action={
            <Button color="primary" onClick={onClickFollow}>
              {isFollow ? '언팔로우' : '팔로우'}
            </Button>
          }
        />
      )}
      {post.Images && <ImagePost images={post.Images} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {post.User.nickname}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <PostContent content={post.content} />
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={onClickFavorite}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton aria-label="Repeat">
          <Repeat />
        </IconButton>
        <IconButton aria-label="AddComment" onClick={onClickAddComment}>
          <AddCommentIcon />
        </IconButton>
        <IconButton
          style={{ marginLeft: 'auto' }}
          aria-label="Repeat"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box display="flex">
            <Box flexGrow={1}>
              <Button color="primary">수정</Button>
            </Box>
            <Box flexGrow={1}>
              <Button color="secondary" onClick={onClickRemove}>
                삭제
              </Button>
            </Box>
          </Box>
        </Popover>
      </CardActions>
      <Collapse in={addCommentToggle} unmountOnExit>
        <CommentForm post={post} />
        <List className={classes.root}>
          {post.Comments &&
            post.Comments.map(v => (
              <Comments key={v.User.id + v.User.name} data={v} />
            ))}
        </List>
      </Collapse>
    </Card>
  );
});

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

PostCard.displayName = 'PostCard';

export default PostCard;
