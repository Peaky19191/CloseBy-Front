import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getEvents } from '../../actions/events';

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
