import React, { useEffect, useState } from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import useStyles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Logo from '../images/logo2.jpg'


const Header = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        setChecked(true);
    },[]);

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
    
    return (
        <div className={classes.root} id="header">

            <Collapse in={checked} {...(checked ? {timeout: 1000 } : {})} collapsedHeight={50}>
                <div className={classes.container}>           
                    <h1 className={classes.title}>
                        Welcome to <br />
                        
                        <img className={classes.logo} src={Logo} alt="website logo"></img>
                    </h1>
                    <Scroll to="info" smooth={true}>  
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown}/>
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
            
        </div>
        
    ); 
        
}

export default Header;