import './App.css';
import useStyles from './styles';
import Home from './Pages/home';
import About from './Pages/about';
import Contact from './Pages/contact';
import Events from './Pages/events';
import Login from './Pages/auth';
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Register } from './Components/Profiles/User/Register/RegisterUser'
import { ResetPassword } from './Components/Auth/ResetPassword/ResetPassword'
import Profile from './Components/Profiles/Profile'
import { history } from "./Helpers/history";
import Navbar from './Components/Navbar/Navbar';
import User from './Components/Profiles/User/User';
import CompanyWorker from './Components/Profiles/CompanyWorker/CompanyWorker';
import CompanyAdmin from './Components/Profiles/CompanyAdmin/CompanyAdmin';
import GlobalAdmin from './Components/Profiles/GlobalAdmin/GlobalAdmin';
import RegCompAdmin from './Components/Profiles/CompanyAdmin/Register/RegisterCompAdmin';
import CompanyAdminList from './Components/Profiles/CompanyAdmin/List/CompAdminsList';
import UsersList from './Components/Profiles/User/List/UsersList';
import CompanyWorkerList from './Components/Profiles/CompanyWorker/List/CompanyWorkersList';
import RegCompWorker from './Components/Profiles/CompanyWorker/Register/RegisterCompWorker';
import NewPassword from './Components/Auth/NewPassword/NewPassword';
import CompanyList from './Components/Profiles/Company/List/CompanyList';
import RegCompany from './Components/Profiles/Company/Register/RegisterCompany';
import UserDetails from './Components/Profiles/User/Details/UserDetails';
import CompAdminDetails from './Components/Profiles/CompanyAdmin/Details/CompAdminDetails';
import CompanyDetails from './Components/Profiles/Company/Details/CompanyDetails';
import CompWorkerDetails from './Components/Profiles/CompanyWorker/Details/CompWorkerDetails';

import { useEffect } from 'react';
import { logout } from "./Actions/auth";
import { clearMessage } from "./Actions/message";
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
      <div className={classes.root}>
        <Navbar />
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
          <Route exact path="/compAdmin" component={CompanyAdmin} />
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
          <Route exact path="/compAdminDetails" component={CompAdminDetails} />
          <Route exact path="/companyDetails" component={CompanyDetails} />
          <Route exact path="/compWorkerDetails" component={CompWorkerDetails} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
