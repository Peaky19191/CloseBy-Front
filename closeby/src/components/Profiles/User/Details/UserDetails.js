import React, { useState, useEffect } from "react";


function UserDetails({ passData }) {
    console.log(passData)
    return (
        <div className="popup-box">
            <div className="box">
                {passData}
            </div>
        </div>
    );
};

export default UserDetails;


