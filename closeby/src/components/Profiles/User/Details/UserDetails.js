import React, { useState, useEffect } from "react";


const UserDetails = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default UserDetails;


