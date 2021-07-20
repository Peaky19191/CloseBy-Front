import React from 'react'
import  useStyles  from './styles';
import ImageCard from '../ImageCard/ImageCard';
import infos from '../../../../Static/infos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useWindowPosition from '../../../../Hook/useWindowPosition';
//import { Link as Scroll } from 'react-scroll';


const InfoSteps = () => {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
        <div className={classes.container}>
        <div className={classes.root} id="info">
        <ImageCard info={infos[0]} checked={checked}/>
        
        <ImageCard info={infos[1]} checked={checked}/>
        
        <ImageCard info={infos[2]} checked={checked}/>
        </div>                 
    </div>
    
    );
}

export default InfoSteps;