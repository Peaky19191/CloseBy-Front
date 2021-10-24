import React, { useState, useEffect } from "react";
import useStyles from './styles';
import User from '../../../../api/user'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


const UserDetails = ({ idUser, handleClose }) => {
    const classes = useStyles();
    const userId = idUser;

    const [disaled, setDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [userData, setUserData] = useState([]);

    const dataTem = {
        "id": "94496023-f25d-4e90-9f34-35c59ef57ab5",
        "email": "user@cb.com",
        "role": "User",
        "gender": "Male",
        "firstName": "Aaron",
        "lastName": "Cannon",
    };

    const startEditing = () => {
        setDisabled(false);
        setEditMode(true);
    }

    const stopEditing = () => {
        setDisabled(true);
        setEditMode(false);
    }

    const getUserDetails = () => {
        console.log(userId)
        User.getUserId(userId)
            .then((response) => {
                const user = response.data.items;
                console.log(user)

                //setUserData(user);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getUserDetails, [userId]);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.popupBox} >
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <SupervisorAccountIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Details of the User</Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField value={dataTem.firstName} disabled={disaled} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField value={dataTem.lastName} disabled={disaled} name="lastName" htmlFor="lastName" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField value={dataTem.email} disabled={disaled} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                            </Grid>
                        </Grid>
                        {editMode ?
                            <>
                                <Button className={classes.buttonEditSave} onClick={() => { }} fullWidth variant="contained"  >
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
                        <Button className={classes.buttonClose} onClick={handleClose} fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </form>
                </Paper>
            </div>
        </Container>
    );
};

export default UserDetails;


