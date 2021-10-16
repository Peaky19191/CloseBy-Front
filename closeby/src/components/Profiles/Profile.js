import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import  useStyles  from './styles';

const Profile = () => {
  const classes = useStyles();
  const { profile: currentProfile } = useSelector((state) => state.auth);

  if (!currentProfile) {
    return <Redirect to="/login" />;
  }

  return (
    <div >
        <h3>
          <Typography gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}>Profile</Typography>
        </h3>  
      <p>
      <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >Token:</Typography> 
        <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >&emsp;{currentProfile.accessToken.substring(0, 20)} ...{" "}
        {currentProfile.accessToken.substr(currentProfile.accessToken.length - 20)}</Typography>
      </p>
      <p>
      <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >Email:</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            > &emsp;{currentProfile.email} </Typography>
      </p>
      <p>
      <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >ID:</Typography> 
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >&emsp;{currentProfile.id}</Typography>
      </p>
      <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >Authorities:</Typography>
      
      <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            > &emsp;{currentProfile.role} </Typography>
      
    </div>
  );
};

export default Profile;
