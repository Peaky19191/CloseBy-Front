import './App.css';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Events from './pages/events';
import FormBox from './pages/formBox';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './components/accountBox/common';



import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    // if (currentUser) {
    //   setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
    //   setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    // }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };


  return (
    <Router history={history}>
      <>
        <Nav>
          <NavLink to='/'>
            <img src="https://i.imgur.com/Tngx1R2.png" alt="logo" />
          </NavLink>
          <Bars />

          {currentUser ? (
            <div >
              <NavMenu>
                <NavLink to='/about' activeStyle>About</NavLink>
                <NavLink to='/contact' activeStyle>Contact</NavLink>
                <NavLink to='/events' activeStyle>Events</NavLink>
                <NavLink to='/profile' activeStyle>ss</NavLink>
                <NavLink to='/login' onClick={logOut} activeStyle>LogOut</NavLink></NavMenu>
            </div>
          ) : (
            <div >
              <NavMenu>
                <NavBtn>
                  <NavBtnLink to='/formBox'>Sign In</NavBtnLink>
                </NavBtn>
              </NavMenu>
            </div>
          )}

        </Nav>
      </>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/about" exact component={About} />
          <Route exact path="/contact" exact component={Contact} />
          <Route exact path="/events" exact component={Events} />
          <Route exact path="/formBox" exact component={FormBox} />
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
