import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { userData } from './store.js';
import Layout from './components/Layout';

let store = createStore (userData);

ReactDOM.render (
  <Provider store={store}>
    <Layout />
  </Provider>, document.getElementById ('container'));
