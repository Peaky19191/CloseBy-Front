import React, { useState, useEffect } from "react";
import useStyles from './styles';


const UserDetails = props => {
    const classes = useStyles();

    return (
        <div className={classes.popupBox} >
            <div className={classes.box} >
                <span className={classes.closeIcon} onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default UserDetails;


