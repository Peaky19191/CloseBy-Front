import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import FormBox from './pages/formBox';


function App() {
  return (
  <>
    <Router>
      <Navbar />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/formBox" exact component={FormBox} />
    </Switch>
    </Router>
  </>
  );
}

export default App;
