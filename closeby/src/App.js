import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Events from './pages/events';
import Auth from './pages/auth';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './components/Auth/Register/Register'


import Navbar from './components/Navbar/Navbar';

const App = () => {



  return (
    <BrowserRouter>
      <Navbar />
      {/* <div className="container mt-3"> */}
      <Switch>
        <Route exact path="/" exact component={Home} />
        <Route exact path="/about" exact component={About} />
        <Route exact path="/contact" exact component={Contact} />
        <Route exact path="/events" exact component={Events} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
      </Switch>
      {/* </div> */}
    </BrowserRouter>);
}
export default App;
