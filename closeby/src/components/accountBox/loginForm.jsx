import React, { useContext, useState, useEffect} from 'react';
import { AccountContext } from './accountContext';
import {BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, FieldContainer, FieldError, FormSuccess, FormError} from './common';
import * as yup from "yup";
import axios from "axios";
import { Field, useFormik } from "formik";


const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

export function LoginForm(props){
  const { switchToSignUp } = useContext(AccountContext);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    const response = await axios
      .post("http://localhost:5000/api/identity/login", values)
      .catch((err) => {
      if (err && err.response) 
        setError(err.response.data.message);
      });
      if (response && response.status==200) {
        alert("Welcome back in. Authenticating...");
      }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

    return (
      <BoxContainer>
          <FormError>{error ? error : ""}</FormError>
          <FormContainer onSubmit={formik.handleSubmit}>
          <FieldContainer>
            <Input name="email" htmlFor="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FieldError>
              {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
            </FieldError>
          </FieldContainer>
          <FieldContainer>
            <Input name="password" htmlFor="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FieldError>
              {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
            </FieldError>
          </FieldContainer>
          <MutedLink href="#">Forget your password?</MutedLink>
          <SubmitButton type="submit" disabled={!formik.isValid}>Sign in</SubmitButton>
          </FormContainer>
          <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignUp}>Sign up</BoldLink>
          </MutedLink>
      </BoxContainer>
      );
}