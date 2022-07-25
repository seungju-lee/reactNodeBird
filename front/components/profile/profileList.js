import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const ProfileList = ({ keyValue, profileDetailList }) => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <ListItem key={keyValue} button>
        <ListItemAvatar>
          <Avatar alt={`Avatar n°${keyValue + 1}`} />
        </ListItemAvatar>
        <ListItemText
          id={`laebeId${keyValue}`}
          primary={profileDetailList.name}
        />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={handleToggle(keyValue)}
            checked={checked.indexOf(keyValue) !== -1}
            inputProps={{
              'aria-labelledby': `checkbox-list-secondary-label-${keyValue}`,
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

ProfileList.propTypes = {
  profileDetailList: PropTypes.object.isRequired,
  keyValue: PropTypes.number.isRequired,
};

export default ProfileList;
