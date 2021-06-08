import React, { useState, useEffect } from "react";

import GlobalAdminServices from "../../../services/globAdmin.service";

const Admin = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        GlobalAdminServices.getUsersList().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div >
            <header >
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Admin;
