import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SwitchComponent from './Components/Switch/Switch';
import { history } from "./Helpers/history";
import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  require('dotenv').config();

  return (
    <Router history={history}>
      <div className={classes.root}>
        <ToastContainer
          position="bottom-right"
          autoclose={2500}
        />
        <Navbar />
        <SwitchComponent />
      </div>
    </Router>
  );
}
export default App;
