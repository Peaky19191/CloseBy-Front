import { Collapse } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Logo from '../../../Images/logo2.jpg';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    return (
        <div className={classes.root} id="header">
            <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedSize={50}>
                <div className={classes.container}>
                    <h1 className={classes.title}>
                        Welcome to <br />
                        <img className={classes.logo} src={Logo} alt="website logo"></img>
                    </h1>
                </div>
            </Collapse>
        </div>

    );

}

export default Header;