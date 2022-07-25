import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfileList from './profileList';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
  },
  paper: {
    height: 140,
    width: 100,
  },
  pos: {
    marginBottom: 12,
  },
  inline: {
    display: 'inline',
  },
  listRoot: {
    root: {
      width: '100%',
      maxWidth: 360,
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const ProfileFollow = ({ title, data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        <List className={classes.listRoot}>
          {data?.map((v, i) => (
            <React.Fragment key={v.id}>
              <ProfileList keyValue={i} profileDetailList={v} />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProfileFollow.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProfileFollow;
