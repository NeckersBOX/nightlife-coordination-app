import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux'
import { userData, mapStateToProps } from './store.js';
import Layout from './components/Layout';

const StoreLayout = connect(mapStateToProps)(Layout);
let store = createStore (userData);

ReactDOM.render (
  <Provider store={store}>
    <StoreLayout />
  </Provider>, document.getElementById ('container'));
