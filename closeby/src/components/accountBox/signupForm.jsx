import { Field, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, Label, Select, FieldContainer, FieldError, FormSuccess, FormError} from './common';
import { AccountContext } from './accountContext';
import * as yup from "yup";
import axios from "axios";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
  firstName: yup.string().min(3, "Please enter your real name").max(20, "That name is too long!").required("First Name is required!"),
  lastName: yup.string().min(3, "Please enter your real last name").max(20, "That last name is too long!").required("Last Name is required!"),
  gender: yup.string().required("Gender is required!"),
  email: yup.string().email("Please enter a valid email address").required("Email is required!"),
  password: yup.string().matches(PASSWORD_REGEX, "Please enter a strong password").required("Password is required!"),
  confirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], "Password does not match"),
  }).required("Please confirm your password")
});

export function SignupForm(props) {
  const { switchToSignIn } = useContext(AccountContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;

    const response = await axios
      .post("http://localhost:5000/api/user/register", data)
      .catch((err) => {
        if (err && err.response) 
          setError(err.response.data.message);
          setSuccess(null);
        });
        if (response && response.data) {
          setError(null);
          setSuccess("You have registered properly");
          formik.resetForm();
        }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer>
      {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input name="firstName" htmlFor="firstName" type="text" placeholder="First Name" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FieldError>
              {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ""}
            </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input name="lastName" htmlFor="lastName" type="text" placeholder="Last Name" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FieldError>
              {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ""}
            </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Label for="gender">Select your gender</Label>
          <Select name="gender" htmlFor="gender" type="text" placeholder="Gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}>
            <option hidden></option>
            <option value="Male">Male</option> 
            <option value="Female">Female</option>
          </Select>
          <FieldError>
            {formik.touched.gender && formik.errors.gender ? formik.errors.gender : ""}
          </FieldError>
        </FieldContainer>
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
        <FieldContainer>
          <Input name="confirmPassword" htmlFor="confirmPassword" type="password" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <FieldError>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}
            </FieldError>
        </FieldContainer>
        <SubmitButton type="submit" disabled={!formik.isValid}>Signup</SubmitButton>
      </FormContainer>
        <MutedLink href="#">Already have an account?<BoldLink href="#" onClick={switchToSignIn}>Sign in</BoldLink></MutedLink>
    </BoxContainer>
  );
}