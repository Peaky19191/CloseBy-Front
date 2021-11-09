import React from "react";

import useStyles from './styles';
import ExploreIcon from '@mui/icons-material/Explore';
import IconButton from '@material-ui/core/IconButton';


const Compass = (props) => {
    const classes = useStyles();

    return (
        // <div >
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
        // </div>
    )
}

export default Compass;
