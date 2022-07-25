import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
});

const UserCard = () => {
  const { user } = useSelector(state => state.user);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box display="flex" alignItems="center" mx={3} my={2}>
        <Avatar />
        <Box alignItems="center" m={3}>
          <Typography>{user?.name}</Typography>
        </Box>
      </Box>
      <Box display="flex" height={50}>
        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          bgcolor="text.secondary"
          color="primary.contrastText"
        >
          포스팅수
          <br />
          {user?.Posts.length}
        </Box>
        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          bgcolor="text.secondary"
          borderLeft={1}
          color="primary.contrastText"
        >
          팔로잉
          <br />
          {user?.Followings.length}
        </Box>
        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          bgcolor="text.secondary"
          borderLeft={1}
          color="primary.contrastText"
        >
          팔로워
          <br />
          {user?.Follows.length}
        </Box>
      </Box>
    </Card>
  );
};

export default UserCard;
