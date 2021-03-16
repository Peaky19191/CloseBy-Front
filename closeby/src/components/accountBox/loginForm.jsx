import React from 'react';
import { Marginer } from '../marginer';
import {BoxContainer, FormContainer, MutedLink, SubmitButton, Input} from './common';


export function LoginForm(props){
    return (
        <BoxContainer>
          <FormContainer>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </FormContainer>
          <Marginer direction="vertical" marign={10}/>
          <MutedLink href="#">Forget your password?</MutedLink>
          <Marginer direction="vertical" marign={30}/>
          <SubmitButton type="submit">Signin</SubmitButton>
        </BoxContainer>
      );
}