import React, { useState, useEffect } from "react";
import { getUsersListGlAdm } from '../../../actions/globAdmin'
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
    const users = useSelector(state => state.userListGlAdm);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersListGlAdm());
        console.log(users);
    }, []);

    return (
        <div >
            <h3>Users List</h3>
            <ul>
                {users &&
                    users.map((user) => (
                        <li>
                            {user.email}
                        </li>
                    ))}
            </ul>
        </div>
    );
};


export default UserList;
