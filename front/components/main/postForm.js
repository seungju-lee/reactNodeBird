import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequest } from '../../reducers/post';
import useInput from '../../hooks/useInput';

const PostForm = () => {
  const [content, onChangeContent, setContent] = useInput('');
  const imagePaths = useSelector(state => state.post.imagePaths);
  const { id } = useSelector(state => state.user.user);
  const { addPostDone } = useSelector(state => state.post);
  const imageInput = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      setContent('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(addPostRequest({ id, content }));
    },
    [content],
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="포스트 내용"
              multiline
              rows={4}
              value={content}
              placeholder="재미있는 이야기를 올려주세요"
              variant="outlined"
              fullWidth
              onChange={onChangeContent}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" multipart="true" hidden ref={imageInput} />
            <Button
              style={{ marginTop: '10px', float: 'left' }}
              variant="contained"
              color="primary"
              onClick={onClickImageUpload}
            >
              이미지 업로드
            </Button>
            <Button
              type="submit"
              style={{ marginTop: '10px', float: 'right' }}
              variant="contained"
              color="primary"
            >
              입력
            </Button>
          </Grid>
          <Grid item xs={12}>
            {imagePaths.map(v => (
              <div key={v} style={{ display: 'inline-block' }}>
                <image src={v} style={{ width: '200px' }} alt={v} />
                <div>
                  <Button color="primary">제거</Button>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PostForm;
