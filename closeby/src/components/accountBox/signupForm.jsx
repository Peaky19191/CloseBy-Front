import React, { useContext, useState, useEffect} from 'react';
import { AccountContext } from './accountContext';
import { FormContainer, MutedLink, SubmitButton, Input, BoldLink, Label, Select} from './common';
import { Field, useFormik } from "formik";
import * as yup from 'yup';

export function SignupForm(props){
  
  const { switchToSignIn } = useContext(AccountContext);

  const onSubmit = (values) => {
    alert(JSON.stringify(values))
  } 

  const formik = useFormik({ initialValues: { firstName: "", lastName: "", gender: "", email: "", password: "", confirmPassword: "" },
    validateOnBlur: true,
    onSubmit
  });

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <FormContainer>
          <Input name="firstName" type="text" placeholder="First Name" value={formik.values.firstName} onChange={formik.handleChange}/>
          <Input name="lastName" type="text" placeholder="Last Name" value={formik.values.lastName} onChange={formik.handleChange}/>
          <Label for="gender">Select your gender</Label>
          <Select name="gender" type="text" placeholder="Gender" value={formik.values.gender} onChange={formik.handleChange}>
            <option hidden></option>
            <option value="Male">Male</option> 
            <option value="Female">Female</option>
          </Select>
          <Input name="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange}/>
          <Input name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange}/>
        </FormContainer>
        <SubmitButton type="submit">Sign up</SubmitButton>
        </form>
        <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignIn}>Sign in</BoldLink>
        </MutedLink>
    </div>
  );
}