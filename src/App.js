import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SwitchComponent from './Components/Switch/Switch';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  require('dotenv').config();

  return (
    <div className={classes.root}>
      <ToastContainer
        position="bottom-right"
        autoclose={2500}
      />
      <Navbar />
      <SwitchComponent />
    </div>
  );
}
export default App;
