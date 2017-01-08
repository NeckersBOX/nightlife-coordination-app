import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin ();

ReactDOM.render (
  <MuiThemeProvider>
    <Layout />
  </MuiThemeProvider>,
  document.getElementById ('container')
);
