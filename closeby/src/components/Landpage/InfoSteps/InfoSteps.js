import React from 'react'
import { useStyles } from '..InfoSteps/styles';
import { IconButton } from '@material-ui/core';
import ImageCard from '../ImageCard/ImageCard';
import infos from '../../../static/infos'
import useWindowPosition from '../hook/useWindowPosition';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';


const InfoSteps = () => {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
    <div className={classes.container}>
        <div className={classes.root} id="info">
        <ImageCard info={infos[0]} checked={checked}/>
        <ArrowForwardIcon className={classes.arrowForward}/>
        <ImageCard info={infos[1]} checked={checked}/>
        <ArrowForwardIcon className={classes.arrowForward}/>
        <ImageCard info={infos[2]} checked={checked}/>
    </div>    
    <Scroll to="info2" smooth={true}>
        <IconButton>
                <ExpandMoreIcon className={classes.goDown}/>
        </IconButton>
    </Scroll> 
               
    </div>
    
    
    );
}

export default InfoSteps;
