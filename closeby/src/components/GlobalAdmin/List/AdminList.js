import React, { useState, useEffect } from "react";
import { getUsersListGlAdm } from '../../../actions/globAdmin'
import { useDispatch, useSelector } from "react-redux";

const AdminList = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const users = useSelector(state => state.userListGlAdm);
    const dispatch = useDispatch();

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };

    useEffect(() => {
        dispatch(getUsersListGlAdm());
        console.log(users);
    }, []);

    return (
        <div >
            <h3>Users List</h3>
            <ul>
                {users &&
                    users.map((user, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveUser(user, index)}
                        >
                            { user.email}

                        </li>
                    ))}
            </ul>
        </div>
    );
};


export default AdminList;
