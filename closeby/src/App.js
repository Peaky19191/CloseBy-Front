import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Events from './pages/events';
import Auth from './pages/auth';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';



import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import Navbar from './components/Navbar/Navbar';

const App = () => {



  return (
    <Router history={history}>
      {/* <>
        <nav>
          <Link to='/'>
            <img src="https://i.imgur.com/Tngx1R2.png" alt="logo" />
          </Link>

          {currentUser ? (
            <div >
              <div>
                <Link to='/about' activeStyle>About</Link>
                <Link to='/contact' activeStyle>Contact</Link>
                <Link to='/events' activeStyle>Events</Link>
                <Link to='/profile' activeStyle>ss</Link>
                <Link to='/' onClick={logOut} activeStyle>LogOut</Link></div>
            </div>
          ) : (
            <div >
              <div>
                <nav>
                  <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                </nav>
              </div>
            </div>
          )}

        </nav>
      </> */}
      <Navbar />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/about" exact component={About} />
          <Route exact path="/contact" exact component={Contact} />
          <Route exact path="/events" exact component={Events} />
          <Route exact path="/auth" component={Auth} />
          {/* <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
        </Switch>
      </div>
    </Router>
  );
}
export default App;
