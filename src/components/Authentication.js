import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';
import SignUp from './SignUp';
import Login from './Login';
import Logged from './Logged';

const Authentication = React.createClass ({
  getInitialState () {
    return { module: null };
  },
  render () {
    if ( this.props.userAuth )
      return <Logged />;

    if ( this.state.module )
      return this.state.module;

    return (
      <div>
        <a onClick={() => this.setState ({ module: <SignUp back={this.restoreComponent} /> })}>
          Sign Up
        </a>
        {' or '}
        <a onClick={() => this.setState ({ module: <Login back={this.restoreComponent} /> })}>
          Login
        </a>
      </div>
    );
  },
  restoreComponent () {
    this.setState ({ module: null });
  }
});

const StoreAuthentication = connect(mapStateToProps)(Authentication);

export default StoreAuthentication;
