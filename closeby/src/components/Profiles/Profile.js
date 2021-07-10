import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { profile: currentProfile } = useSelector((state) => state.auth);

  if (!currentProfile) {
    return <Redirect to="/login" />;
  }

  return (
    <div >
      <header >
        <h3>
          <strong>Profile</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentProfile.accessToken.substring(0, 20)} ...{" "}
        {currentProfile.accessToken.substr(currentProfile.accessToken.length - 20)}
      </p>
      <p>
        <strong>Email:</strong> {currentProfile.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentProfile.role}
      </ul>
    </div>
  );
};

export default Profile;
