import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../../actions/auth";

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setError(null);

        setLoading(true);

        dispatch(login(username, password))
            .then(() => {
                props.history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    };

    return (
        <div>
            <span>{error ? error : ""}</span>
            {message && (
                <div>
                    {message}
                </div>
            )}
            <form onSubmit={handleLogin}>
                <div>
                    <input name="email" htmlFor="email" type="email" placeholder="Email" value={username} onChange={onChangeUsername} />
                </div>
                <div>
                    <input name="password" htmlFor="password" type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                </div>
                <a href="#">Forget your password?</a>
                <button type="submit" disabled={loading}>
                    {loading && (
                        <span>WAITING....</span>
                    )}
          Sign in
        </button>
            </form>
        </div>
    );
}
export default Login;