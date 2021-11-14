import React from 'react'
import Header from '../Components/Home/Header/Header';
import InfoSteps from '../Components/Home/Landpage/InfoSteps/InfoSteps';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField, MenuItem } from '@material-ui/core';

import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div >
            {/* <Button component={Link} to="/login" > */}
            <Header />
            <InfoSteps />
            {/* </Button> */}

        </div>

    )
}

export default Home;