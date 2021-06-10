import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Events from './pages/events';
import Auth from './pages/auth';
import { CssBaseline } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Register } from './components/Auth/Register/Register'
import Profile from './components/Account/Profile'
import { makeStyles } from '@material-ui/core/styles';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import Navbar from './components/Navbar/navbar';
import User from './components/Account/User';
import Organizer from './components/Account/Organizer';
import Admin from './components/GlobalAdmin/Profile/Admin';
import RegCustAdmin from './components/GlobalAdmin/RegCustAdmin/RegCustAdmin';
import AdminList from './components/GlobalAdmin/List/AdminList';
import Header from './components/Header/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`,
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover',
  },
}));

const App = () => {

  const classes = useStyles();
  return (
    <Router history={history}>
    <div >
      <CssBaseline />  
      <Navbar />
      
    </div>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/about" exact component={About} />
          <Route exact path="/contact" exact component={Contact} />
          <Route exact path="/events" exact component={Events} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user" component={User} />
          <Route exact path="/org" component={Organizer} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/adminAdd" component={RegCustAdmin} />
          <Route exact path="/adminList" component={AdminList} />

        </Switch>
      </div>
    </Router>
  );
}
export default App;
