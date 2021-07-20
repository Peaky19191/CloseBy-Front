import React from 'react';
import useStyles from './styles';
import Logo from '../../../Images/logo2.jpg'


const Header = () => {
    const classes = useStyles();  
    return (
        <div className={classes.root} id="header">
                <div className={classes.container}>           
                    <h1 className={classes.title}>
                        Welcome to <br />                        
                        <img className={classes.logo} src={Logo} alt="website logo"></img>
                    </h1>                                        
                </div>           
        </div>
        
    ); 
        
}

export default Header;