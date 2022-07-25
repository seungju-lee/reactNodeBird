import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import shortId from 'shortid';

const Comments = ({ data }) => (
  <ListItem key={shortId.generate()}>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={data.User.name} secondary={data.content} />
  </ListItem>
);

Comments.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Comments;
