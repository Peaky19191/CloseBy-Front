import './App.css';
import useStyles from './styles';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Events from './pages/events';
import Login from './pages/auth';
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Register } from './components/Profiles/User/Register/RegisterUser'
import { ResetPassword } from './components/Auth/ResetPassword/ResetPassword'
import Profile from './components/Profiles/Profile'
import { history } from "./helpers/history";
import Navbar from './components/Navbar/Navbar';
import User from './components/Profiles/User/User';
import CompanyWorker from './components/Profiles/CompanyWorker/CompanyWorker';
import GlobalAdmin from './components/Profiles/GlobalAdmin/GlobalAdmin';
import RegCompAdmin from './components/Profiles/CompanyAdmin/Register/RegisterCompAdmin';
import CompanyAdminList from './components/Profiles/CompanyAdmin/List/CompAdminsList';
import UsersList from './components/Profiles/User/List/UsersList';
import CompanyWorkerList from './components/Profiles/CompanyWorker/List/CompanyWorkersList';
import RegCompWorker from './components/Profiles/CompanyWorker/Register/RegisterCompWorker';
import NewPassword from './components/Auth/NewPassword/NewPassword';
import CompanyList from './components/Company/List/CompanyList';
import RegCompany from './components/Company/Register/RegisterCompany';
import UserDetails from './components/Profiles/User/Details/UserDetails';
import { useEffect } from 'react';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { useDispatch } from 'react-redux';

const App = () => {
  const classes = useStyles();

  //const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(logout());
  //   dispatch(clearMessage());
  // }, []);

  return (
    <Router history={history}>
      <Navbar />
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/about" exact component={About} />
          <Route exact path="/contact" exact component={Contact} />
          <Route exact path="/events" exact component={Events} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user" component={User} />
          <Route exact path="/compWork" component={CompanyWorker} />
          <Route exact path="/globAdmin" component={GlobalAdmin} />
          <Route exact path="/registerCompAdmin" component={RegCompAdmin} />
          <Route exact path="/compAdminList" component={CompanyAdminList} />
          <Route exact path="/usersList" component={UsersList} />
          <Route exact path="/compWorkerList" component={CompanyWorkerList} />\
          <Route exact path="/registerCompWorker" component={RegCompWorker} />
          <Route exact path="/password-reset/:token" component={NewPassword} />
          <Route exact path="/companyList" component={CompanyList} />
          <Route exact path="/registerCompany" component={RegCompany} />
          <Route exact path="/userDetails" component={UserDetails} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
