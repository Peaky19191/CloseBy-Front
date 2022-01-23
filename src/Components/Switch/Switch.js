import React from "react";
import { Route, Switch } from "react-router-dom";
import About from '../../Components/About/About';
import EmailConfirmation from '../../Components/Auth/EmailConfirmation/EmailConfirmation';
import Login from '../../Components/Auth/Login/Login';
import NewPassword from '../../Components/Auth/NewPassword/NewPassword';
import { ResetPassword } from '../../Components/Auth/ResetPassword/ResetPassword';
import CompanyDetails from '../../Components/Profiles/Company/Details/CompanyDetails';
import CompanyList from '../../Components/Profiles/Company/List/CompanyList';
import RegCompany from '../../Components/Profiles/Company/Register/RegisterCompany';
import CompAdminDetails from '../../Components/Profiles/CompanyAdmin/Details/AdminDetails';
import RegCompAdmin from '../../Components/Profiles/CompanyAdmin/Register/RegisterAdmin';
import CompWorkerDetails from '../../Components/Profiles/CompanyWorker/Details/WorkerDetails';
import CompanyWorkerList from '../../Components/Profiles/CompanyWorker/List/All/WorkersList';
import WorkersListCompanyFiltered from '../../Components/Profiles/CompanyWorker/List/CompanyFiltered/WorkersListCompanyFiltered';
import RegCompWorker from '../../Components/Profiles/CompanyWorker/Register/RegisterWorker';
import EventDetailsEdit from '../../Components/Profiles/Event/Details/Edit/EventDetailsEdit';
import EventDetailsView from '../../Components/Profiles/Event/Details/View/EventDetailsView';
import TicketsEventList from '../../Components/Profiles/Event/List/TicketsFiltered/TicketsListEventFiltered';
import RegEvent from '../../Components/Profiles/Event/Register/RegisterEvent';
import Profile from '../../Components/Profiles/Profile';
import UserDetails from '../../Components/Profiles/User/Details/UserDetails';
import UsersList from '../../Components/Profiles/User/List/UsersList';
import { Register } from '../../Components/Profiles/User/Register/RegisterUser';
import Contact from '../../Pages/contact';
import Home from '../../Pages/home';
import CompanyAdminList from '../Profiles/CompanyAdmin/List/All/AdminsList';
import AdminsListCompanyFiltered from '../Profiles/CompanyAdmin/List/CompanyFiltered/AdminsListCompanyFiltered';
import EventList from '../Profiles/Event/List/All/EventList';
import EventListCompanyFiltered from '../Profiles/Event/List/CompanyFiltered/EventListCompanyFiltered';
import EventListFavorite from '../Profiles/Event/List/UserView/EventListFavorite';
import Events from '../Profiles/Event/List/UserView/EventListMainView';
import EventListTickets from '../Profiles/Event/List/UserView/EventListTickets';

const SwitchComponent = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/email-confirmation/:token" component={EmailConfirmation} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/registerCompAdmin" component={RegCompAdmin} />
            <Route exact path="/compAdminList" component={CompanyAdminList} />
            <Route exact path="/usersList" component={UsersList} />
            <Route exact path="/compWorkerList" component={CompanyWorkerList} />
            <Route exact path="/registerCompWorker" component={RegCompWorker} />
            <Route exact path="/password-reset/:token" component={NewPassword} />
            <Route exact path="/companyList" component={CompanyList} />
            <Route exact path="/registerCompany" component={RegCompany} />
            <Route exact path="/userDetails" component={UserDetails} />
            <Route exact path="/compAdminDetails" component={CompAdminDetails} />
            <Route exact path="/companyDetails" component={CompanyDetails} />
            <Route exact path="/compWorkerDetails" component={CompWorkerDetails} />
            <Route exact path="/registerEvent" component={RegEvent} />
            <Route exact path="/eventList" component={EventList} />
            <Route exact path="/eventDetailsEdit" component={EventDetailsEdit} />
            <Route exact path="/eventDetailsView" component={EventDetailsView} />
            <Route exact path="/workerListCompanyFilter" component={WorkersListCompanyFiltered} />
            <Route exact path="/adminListCompanyFilter" component={AdminsListCompanyFiltered} />
            <Route exact path="/eventListCompanyFilter" component={EventListCompanyFiltered} />
            <Route exact path="/favorites" component={EventListFavorite} />
            <Route exact path="/tickets" component={EventListTickets} />
            <Route exact path="/eventTicketsList/:?" component={TicketsEventList} />
        </Switch>
    );
};
export default SwitchComponent;