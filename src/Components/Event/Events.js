import React from 'react'
import { Typography, Card, CardActions, CardContent, CardMedia, Grid, Container, Button } from '@material-ui/core';
import useStyles from './styles';

export const Events = () => {
    const classes = useStyles();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <>

            <main>
                {/* <div className={classes.container}>
                    <Container maxWidth="md" style={{ marginTop: '100px' }}>
                        <Typography variant="h3" align="center" color="white" gutterBottom>
                            Check out the available Events
                        </Typography>
                    </Container>
                </div> */}
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4} >
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="./assets/cover.png"
                                        title="Event name"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">
                                            Event name
                                        </Typography>
                                        <Typography>
                                            Place for short event description.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </main>

        </>
    )
}

export default Events;
