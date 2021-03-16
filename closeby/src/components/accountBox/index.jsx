import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './loginForm';
import {Marginer} from "../marginer";

const BoxContainer = styled.div`
width: 280px;
min-height: 550px;
display: flex;
flex-direction: column;
border-radius: 19px;
background-color: #fff;
box-shadow: 0 0 20px rgba(15, 15, 15, 0.28);
position: relative;
overflow: hidden;
`;

const TopContainer = styled.div`
width: 100%;
height: 250px;
display: flex;
flex-direction: column;
justify-content: flex-end;
padding: 0 1.8em;
padding-bottom: 5em;
`;

const BackDrop = styled.div`
width: 160%;
height: 550px;
position: absolute;
display: flex;
flex-direction: column;
border-radius: 50%;
transform: rotate(60deg);
top: -290px;
left: -70px;
background: rgb(29,18,214);
background: linear-gradient(90deg, rgba(29,18,214,1) 2%, rgba(20,20,210,1) 21%, rgba(0,26,255,1) 35%, rgba(0,76,255,1) 69%, rgba(0,104,255,1) 98%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;


const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

export function AccountBox(props){
    return (<BoxContainer>
        <TopContainer>
            <BackDrop></BackDrop>
            <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <LoginForm></LoginForm>
        </InnerContainer>
    </BoxContainer>);

}