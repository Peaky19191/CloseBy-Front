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
import GlobalAdmin from './Components/Profiles/GlobalAdmin/GlobalAdmin';
import RegCompAdmin from './Components/Profiles/CompanyAdmin/Register/RegisterCompAdmin';
import CompanyAdminList from './Components/Profiles/CompanyAdmin/List/CompAdminsList';
import UsersList from './Components/Profiles/User/List/UsersList';

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
          <Route exact path="/reisterCompAdmin" component={RegCompAdmin} />
          <Route exact path="/compAdminList" component={CompanyAdminList} />
          <Route exact path="/usersList" component={UsersList} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
