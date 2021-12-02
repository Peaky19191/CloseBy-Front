import './App.css';
import useStyles from './styles';
import React from "react";
import { Router } from "react-router-dom";
import { history } from "./Helpers/history";
import Navbar from './Components/Navbar/Navbar';
import SwitchComponent from './Components/Switch/Switch';

const App = () => {
  const classes = useStyles();

  require('dotenv').config();

  return (
    <Router history={history}>
      <div className={classes.root}>
        <Navbar />
        <SwitchComponent />
      </div>
    </Router>
  );
}
export default App;
