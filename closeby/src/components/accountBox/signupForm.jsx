import React, { useContext } from 'react';
import { AccountContext } from './accountContext';
import {BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink} from './common';


export function SignupForm(props){
    const { switchToSignIn } = useContext(AccountContext);

    return (
        <BoxContainer>
          <FormContainer>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
          </FormContainer>
          <SubmitButton type="submit">Sign up</SubmitButton>
          <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignIn}>Sign in</BoldLink>
          </MutedLink>
        </BoxContainer>
      );
}