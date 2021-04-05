import React, { useContext, useState, useEffect} from 'react';
import { AccountContext } from './accountContext';
import {BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink} from './common';
import { axios } from '../../axios';
import { AccountsList } from '../../pages/accountsList'
import { Account } from './accounts';


export function SignupForm(props){
  const { switchToSignIn } = useContext(AccountContext);

  const [formData, setFormData] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const getAccount = async () => {
    const response = await axios.get("/accounts")
    .catch((err) => console.log("Error: ", err));

    if (response && response.data){
      setAccounts(response.data);
    }  
  };

  const addAccount = async () => {
    const response = await axios.post("/accounts", formData)
    .catch((err) => {console.log("Error: ", err)});
  };

  useEffect(() => {
      getAccount();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (

    <div>
        <form onSubmit={addAccount}>
        <FormContainer>
          <Input name="id" htmlFor="id" type="number" placeholder="Id" onChange={handleChange}/>
          <Input name="fullName" htmlFor="fullName" type="text" placeholder="Full Name" onChange={handleChange}/>
          <Input name="email" htmlFor="email" type="email" placeholder="Email" onChange={handleChange}/>
          <Input name="password" htmlFor="password" type="password" placeholder="Password" onChange={handleChange}/>
          {/* <Input type="password" placeholder="Confirm Password" /> */}
        </FormContainer>
        <SubmitButton type="submit">Sign up</SubmitButton>
        </form>
		

        <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignIn}>Sign in</BoldLink>
        </MutedLink>

 
          </div>

    );
}