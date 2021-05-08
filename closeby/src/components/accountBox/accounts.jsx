import React from "react";

export function Account(props) {
  const { id, firstName, lastName, gender, email, password, onDelete } = props;

  return (
    <div className="account-wrapper">
      <div className="account-container">
        <div className="account-first-name">{firstName}</div>
        <div className="account-last-name">{lastName}</div>
        <div className="account-gender">{gender}</div>
        <div className="account-email">{email}</div>
        <div className="account-password">{password}</div>
      </div>
      <span className="account-remove" onClick={() => onDelete(id)}>
        ❌
      </span>
    </div>
  );
}