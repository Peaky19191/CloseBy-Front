import { Container, Grid, Grow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEvents } from '../../Actions/events';


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
