import React from 'react'
import { Typography, Card, CardActions, CardContent, CardMedia, Grid, Container, Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1, 0, 8),
        color: "#FFFFFF"
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%'  //16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export const Events = () => {
    const classes = useStyles();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <>
            
            <main>
                <div className={classes.container}>
                    <Container maxWidth="md" style={{ marginTop: '100px'}}>
                        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                            Sprawdź dostępne wydarzenia
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Przeglądaj pośród dziesiątek nadchodzących wydarzeń i sprawdź szczegóły tych, które Cię interesują!
                             Nie przegap okazji na zakup biletów!
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card)=>(
                            <Grid item key={card} xs={12} sm={6} md={4} >
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
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
                                    <Button size="small" color="primary">Wyświetl</Button>
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
