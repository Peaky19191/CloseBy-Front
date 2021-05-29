import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import './index.css';
import thunk from 'redux-thunk';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';


import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);