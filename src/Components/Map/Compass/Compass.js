import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@mui/icons-material/Explore';
import React from "react";
import useStyles from './styles';



const Compass = (props) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.compassContainer}>
            <p>
                Click on the compass for your location
            </p>
            <IconButton className={classes.compassContainer} onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        props.panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }} >
                <ExploreIcon panTo={props.panTo} />
            </IconButton>
        </Grid>
    )
}

export default Compass;
