import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import ProfileFollow from '../components/profile/profileFollow';
import AppLayout from '../components/appLayout';

const DivStyle = styled.div`
  float: right;
`;

const TextFieldStyle = styled.div`
  margin-bottom: 20px;
`;

const PROFILE = () => {
  const { user } = useSelector(state => state.user);
  return (
    <>
      <AppLayout>
        <div>
          <TextFieldStyle>
            <TextField
              id="standard-full-width"
              label="닉네임"
              style={{ margin: 8 }}
              placeholder="닉네임 입력..."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TextFieldStyle>
          <ProfileFollow title="팔로우 목록" data={user?.Follows} />
          <ProfileFollow title="팔로잉 목록" data={user?.Followings} />
          <DivStyle>
            <Button variant="contained" color="primary">
              확인
            </Button>
          </DivStyle>
        </div>
      </AppLayout>
    </>
  );
};
export default PROFILE;
