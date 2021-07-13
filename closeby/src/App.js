import './App.css';
import Home from './Pages/home';
import About from './Pages/about';
import Contact from './Pages/contact';
import Events from './Pages/events';
import Auth from './Pages/auth';
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Register } from './Components/Profiles/User/Register/RegisterUser'
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
