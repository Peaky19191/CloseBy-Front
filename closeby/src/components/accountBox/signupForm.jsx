import React, { useContext, useState, useEffect} from 'react';
import { AccountContext } from './accountContext';
import { FormContainer, MutedLink, SubmitButton, Input, BoldLink, Label, Select} from './common';
import { axios } from '../../axios';



export function SignupForm(props){
  const { switchToSignIn } = useContext(AccountContext);

  const [formData, setFormData] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const addAccount = async () => {
    const response = await axios.post("/api/user/register", formData)
    .catch((err) => {console.log("Error: ", err)});
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div>
        <form onSubmit={addAccount}>
        <FormContainer>
          <Input name="firstName" htmlFor="firstName" type="text" placeholder="First Name" onChange={handleChange}/>
          <Input name="lastName" htmlFor="firstName" type="text" placeholder="Last Name" onChange={handleChange}/>
          <Label for="gender">Select your gender</Label>
          <Select name="gender" htmlFor="gender" type="text" placeholder="Gender" onChange={handleChange}>
            <option value="Male">Male</option> 
            <option value="Female">Female</option>
          </Select>
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