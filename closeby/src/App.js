import './App.css';
import styled from 'styled-components';
import { AccountBox } from './components/accountBox';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import Events from './pages/events';
import FormBox from './pages/formBox';

const AppContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

function App() {
  return (
  <>
    <Router>
      <Navbar />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/events" exact component={Events} />
      <Route path="/formBox" exact component={FormBox} />
    </Switch>
    </Router>

    <AppContainer>
      <AccountBox/>
    </AppContainer>
  </>
  );
}

export default App;
