import React, { useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addCommentRequest } from '../../reducers/post';
import useInput from '../../hooks/useInput';

const CommentForm = ({ post }) => {
  const [content, onChangeContent, setContent] = useInput('');
  const id = useSelector(state => state.user.user?.id);
  const { addCommentDone } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentDone) {
      setContent('');
    }
  }, [addCommentDone]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(addCommentRequest({ content, postId: post.id, id }));
    },
    [content, id],
  );
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <TextField
          id="outlined-basic"
          value={content}
          fullWidth
          label="댓글"
          placeholder="댓글을 달아주세요"
          variant="outlined"
          onChange={onChangeContent}
        />
        <Button
          style={{ float: 'right', zIndex: 1 }}
          color="primary"
          variant="contained"
          type="submit"
        >
          입력
        </Button>
      </form>
    </>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
