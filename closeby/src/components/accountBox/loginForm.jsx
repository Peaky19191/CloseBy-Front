import React, { useContext, useState, useEffect} from 'react';
import { AccountContext } from './accountContext';
import {BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink} from './common';


export function LoginForm(props){

  const { switchToSignUp } = useContext(AccountContext);



    return (
      <div>
      <form >
          <FormContainer>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
          </FormContainer>
          <MutedLink href="#">Forget your password?</MutedLink>
          <SubmitButton type="submit">Sign in</SubmitButton>
      </form>
          <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignUp}>Sign up</BoldLink>
          </MutedLink>
      </div>
      );
}