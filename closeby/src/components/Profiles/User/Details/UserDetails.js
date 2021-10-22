import React, { useState, useEffect } from "react";
import useStyles from './styles';
import User from '../../../../api/user'


const UserDetails = ({ idUser }) => {
    const classes = useStyles();

    const [userData, setUserData] = useState([]);
    const userId = idUser;

    const getUserDetails = (idUser) => {
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
        <div className={classes.popupBox} >
            <div className={classes.box} >
                <span className={classes.closeIcon} onClick={idUser.handleClose}>x</span>
                {idUser}
            </div>
        </div>
    );
};

export default UserDetails;


