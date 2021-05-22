import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { AccountContext } from '../accountContext';
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, FieldContainer, FieldError, FormSuccess, FormError } from '../common';
import * as yup from "yup";
import axios from "axios";
import { Field, useFormik } from "formik";
import { login } from "../../../actions/auth";


const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = (props) => {
  // const { switchToSignUp } = useContext(AccountContext);

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

  // const onSubmit = async (values) => {
  //   setError(null);
  //   const response = await axios
  //     .post("http://localhost:5000/api/identity/login", values)
  //     .catch((err) => {
  //       if (err && err.response)
  //         setError(err.response.data.type);
  //     });
  //   if (response && response.status == 200) {
  //     alert("Welcome back in. Authenticating...");
  //   }
  // };

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validateOnBlur: true,
    handleLogin,
    validationSchema: validationSchema,
  });

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  };

  return (
    <BoxContainer>
      <FormError>{error ? error : ""}</FormError>
      {message && (
        <div>
          {message}
        </div>
      )}
      <FormContainer onSubmit={handleLogin}>
        <FieldContainer>
          <Input name="email" htmlFor="email" type="email" placeholder="Email" value={username} onChange={onChangeUsername} />
          {/* <FieldError>
            {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
          </FieldError> */}
        </FieldContainer>
        <FieldContainer>
          <Input name="password" htmlFor="password" type="password" placeholder="Password" value={password} onChange={onChangePassword} />
          {/* <FieldError>
            {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
          </FieldError> */}
        </FieldContainer>
        <MutedLink href="#">Forget your password?</MutedLink>
        <SubmitButton type="submit" disabled={loading}>
          {loading && (
            <span>WAITING....</span>
          )}
          Sign in
        </SubmitButton>
      </FormContainer>
      {/* <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignUp}>Sign up</BoldLink>
      </MutedLink> */}
    </BoxContainer>
  );
}
export default Login;