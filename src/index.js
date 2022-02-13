import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from './App';
import { history } from "./Helpers/history";
import './index.css';
import setupInterceptors from "./Services/Auth/setupInterceptors";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

setupInterceptors(store, history);