import './App.css';
import Home from './Pages/home';
import About from './Pages/about';
import Contact from './Pages/contact';
import Events from './Pages/events';
import Auth from './Pages/auth';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Register } from './Components/Profiles/User/Register/Register'
import Profile from './Components/Profiles/Profile'

import { logout } from "./Actions/auth";
import { clearMessage } from "./Actions/message";
import { history } from "./Helpers/history";
import Navbar from './Components/Navbar/Navbar';
import User from './Components/Profiles/User/User';
import Organizer from './Components/Profiles/CompanyWorker/CompanyWorker';
import Admin from './Components/Profiles/GlobalAdmin/GlobalAdmin';
import RegCompAdmin from './Components/Profiles/GlobalAdmin/ReisterCompAdmin/RegisterCompAdmin';
import UserList from './Components/Profiles/GlobalAdmin/List/CompAdminsList';

const App = () => {



  return (
    <Router history={history}>
      <Navbar />
      <div className="container mt-3">
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
          <Route exact path="/adminAdd" component={RegCompAdmin} />
          <Route exact path="/adminList" component={UserList} />

        </Switch>
      </div>
    </Router>
  );
}
export default App;
