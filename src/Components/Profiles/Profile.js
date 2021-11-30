import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import User from '../../Services/Profiles/user.service'
import CompWorker from '../../Services/Profiles/companyWorker.service'
import CompAdmin from '../../Services/Profiles/companyAdmin.service'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import { editCompAdmin } from "../..//Actions/Profiles/companyAdmin";
import { editCompWorker } from "../../Actions/Profiles/companyWorker";
import { editUser } from "../../Actions/Profiles/user";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const classes = useStyles();

  const { profile: currentProfile } = useSelector((state) => state.auth);

  const { message } = useSelector(state => state.message);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };

  const getProfileDetails = () => {
    if (currentProfile.role === "User") {
      getUserDetails();
    }
    if (currentProfile.role === "CompanyWorker") {
      getCompWorkerDetails();
    }
    if (currentProfile.role === "CompanyAdmin") {
      getCompAdminDetails();
    }
  }
  useEffect(getProfileDetails, [currentProfile.id]);

  const getUserDetails = () => {
    User.getUserId(currentProfile.id).then((response) => {
      const user = response.data;

      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setGender(user.gender);
    })
      .catch((e) => {
        console.log(e);
      });
  }

  const getCompWorkerDetails = () => {
    CompWorker.getCompanyWorkerId(currentProfile.id)
      .then((response) => {
        const compWorker = response.data;

        setFirstName(compWorker.firstName);
        setLastName(compWorker.lastName);
        setEmail(compWorker.email);
        setGender(compWorker.gender);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getCompAdminDetails = () => {
    CompAdmin.getCompanyAdminId(currentProfile.id)
      .then((response) => {
        const compAdmin = response.data;

        setFirstName(compAdmin.firstName);
        setLastName(compAdmin.lastName);
        setEmail(compAdmin.email);
        setGender(compAdmin.gender);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [disaled, setDisabled] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const startEditing = () => {
    setDisabled(false);
    setEditMode(true);
  }

  const stopEditing = () => {
    setDisabled(true);
    setEditMode(false);
  }
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack()
  }

  const sendEdited = () => {
    setSuccessful(false);

    if (currentProfile && (currentProfile.role === "User")) {
      dispatch(editUser(currentProfile.id, firstName, lastName, gender, email))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        })
    }
    if (currentProfile && (currentProfile.role === "CompanyWorker")) {
      dispatch(editCompWorker(currentProfile.id, firstName, lastName, gender, email))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (currentProfile && (currentProfile.role === "CompanyAdmin")) {
      dispatch(editCompAdmin(currentProfile.id, firstName, lastName, gender, email))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <SupervisorAccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Details of your account</Typography>
        {successful ?
          <Alert className={classes.alert} severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>You have successfully edit your Company Admin</strong>
          </Alert>
          :
          (message ?
            <Alert className={successful ? classes.alert : classes.alert} severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{message}</strong>
            </Alert>
            :
            null
          )
        }
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField value={firstName} label="First Name" onChange={onChangeFirstName} InputProps={{ readOnly: disaled }} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} >
              <TextField value={lastName} onChange={onChangeLastName} InputProps={{ readOnly: disaled }} name="lastName" htmlFor="lastName" variant="outlined" fullWidth label="Last Name" />
            </Grid>
            <Grid item xs={12} >
              <TextField value={email} label="Email Address" onChange={onChangeEmail} InputProps={{ readOnly: disaled }} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
            </Grid>
            <Grid item xs={12} >
              <TextField value={gender} htmlFor="gender" variant="outlined" InputProps={{ readOnly: disaled }} select={disaled ? false : true} fullWidth onChange={onChangeGender} type="text" label="Gender">
                <MenuItem value={"Male"} >Male</MenuItem>
                <MenuItem value={"Female"} >Female</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid className={classes.buttonsContainer} spacing={2}>
            {editMode ?
              <>
                <Button onClick={() => { sendEdited() }} className={classes.buttonEditSave} fullWidth variant="contained"  >
                  Save
                </Button>
                <Button className={classes.buttonEditStop} onClick={() => { stopEditing() }} fullWidth variant="contained" color="primary" >
                  Stop Editinig
                </Button>
              </>
              :
              <Button className={classes.buttonEditStart} onClick={() => { startEditing() }} fullWidth variant="contained" color="primary" >
                Edit
              </Button>
            }
            <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
              Close
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
