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
import Navbar from './components/Navbar/navbar';
import User from './components/Profiles/User/User';
import CompanyWorker from './components/Profiles/CompanyWorker/CompanyWorker';
import GlobalAdmin from './components/Profiles/GlobalAdmin/GlobalAdmin';
import RegCompAdmin from './components/Profiles/CompanyAdmin/Register/RegisterCompAdmin';
import CompanyAdminList from './components/Profiles/CompanyAdmin/List/CompAdminsList';
import UsersList from './components/Profiles/User/List/UsersList';
import CompanyWorkerList from './components/Profiles/CompanyWorker/List/CompanyWorkersList';
import RegCompWorker from './components/Profiles/CompanyWorker/Register/RegisterCompWorker';

const App = () => {
  const classes = useStyles();

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
          <Route exact path="/reigsterCompAdmin" component={RegCompAdmin} />
          <Route exact path="/compAdminList" component={CompanyAdminList} />
          <Route exact path="/usersList" component={UsersList} />
          <Route exact path="/compWorkerList" component={CompanyWorkerList} />\
          <Route exact path="/reigsterCompWorker" component={RegCompWorker} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
