import React, { useContext, useState, useEffect} from 'react';
import { AccountContext } from './accountContext';
import {BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink} from './common';
import { axios } from '../../axios';


export function LoginForm(props){

  const { switchToSignUp } = useContext(AccountContext);

  const [formData, setFormData] = useState([]);
  const [login, setLogin] = useState([]);

  const submit = async () => {
    const response = await axios.post("/login", formData)
    .catch((err) => {console.log("Error: ", err)});
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

    return (
      <div>
      <form onSubmit={submit}>
          <FormContainer>
            <Input name="email" htmlFor="email" type="email" placeholder="Email" onChange={handleChange} />
            <Input name="password" htmlFor="password" type="password" placeholder="Password" onChange={handleChange}/>
          </FormContainer>
          <MutedLink href="#">Forget your password?</MutedLink>
          <SubmitButton type="submit">Sign in</SubmitButton>
      </form>
          <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignUp}>Sign up</BoldLink>
          </MutedLink>
      </div>
      );
}