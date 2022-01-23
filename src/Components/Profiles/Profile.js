import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editCompAdmin, getCompAdminIdDispatch } from "../../Actions/Profiles/companyAdmin";
import { editCompWorker, getCompWorkerIdDispatch } from "../../Actions/Profiles/companyWorker";
import { editUser, getUserIdDispatch } from "../../Actions/Profiles/user";
import Message from '../Message/Message';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();
  const myAccount = true;

  const [listLoaded, setListLoaded] = useState(false);

  const { profile: currentProfile } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

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
  useEffect(getProfileDetails, [currentProfile.id]);// eslint-disable-line react-hooks/exhaustive-deps

  const getUserDetails = () => {
    dispatch(getUserIdDispatch(currentProfile.id))
      .then((response) => {
        const user = response.data;

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setGender(user.gender);
        setListLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getCompWorkerDetails = () => {
    dispatch(getCompWorkerIdDispatch(currentProfile.id))
      .then((response) => {
        const compWorker = response.data;

        setFirstName(compWorker.firstName);
        setLastName(compWorker.lastName);
        setEmail(compWorker.email);
        setGender(compWorker.gender);
        setListLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getCompAdminDetails = () => {
    dispatch(getCompAdminIdDispatch(currentProfile.id))
      .then((response) => {
        const compAdmin = response.data;

        setFirstName(compAdmin.firstName);
        setLastName(compAdmin.lastName);
        setEmail(compAdmin.email);
        setGender(compAdmin.gender);
        setListLoaded(true);
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
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();

  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack()
  }

  const sendEdited = () => {
    setShowMessage(false);
    setLoading(true);

    if (currentProfile && (currentProfile.role === "User")) {
      dispatch(editUser(currentProfile.id, firstName, lastName, gender, email))
        .then(() => {
          setShowMessage(true);
          setLoading(false);
        })
        .catch(() => {
          setShowMessage(true);
          setLoading(false);
        })
    }
    if (currentProfile && (currentProfile.role === "CompanyWorker")) {
      dispatch(editCompWorker(currentProfile.id, firstName, lastName, gender, email, myAccount))
        .then(() => {
          setShowMessage(true);
          setLoading(false);
        })
        .catch(() => {
          setShowMessage(true);
          setLoading(false);
        });
    }
    if (currentProfile && (currentProfile.role === "CompanyAdmin")) {
      dispatch(editCompAdmin(currentProfile.id, firstName, lastName, gender, email, myAccount))
        .then(() => {
          setShowMessage(true);
          setLoading(false);
        })
        .catch(() => {
          setShowMessage(true);
          setLoading(false);
        });
    }
  };

  return (
    (listLoaded !== true) ?
      <Grid className={classes.spinnerContainer}>
        <CircularProgress size={500} thickness={1} />
      </Grid>
      :
      <>
        <Container className={classes.container} component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <SupervisorAccountIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Details of your account</Typography>
            {showMessage &&
              <Message />
            }
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField value={firstName} label="First Name" onChange={onChangeFirstName} InputProps={{ readOnly: disaled }} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} >
                  <TextField value={lastName} onChange={onChangeLastName} InputProps={{ readOnly: disaled }} name="lastName" htmlFor="lastName" variant="outlined" fullWidth label="Last Name" />
                </Grid>
                {/* <Grid item xs={12} >
                  <TextField value={email} label="Email Address" onChange={onChangeEmail} InputProps={{ readOnly: disaled }} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                </Grid> */}
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
                      {loading ? (
                        <CircularProgress size="20px" />
                      ) : "Save"}
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
                  back
                </Button>
              </Grid>
            </form>
          </Paper>
        </Container>
      </>
  );
};

export default Profile;
