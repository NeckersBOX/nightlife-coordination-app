import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const Login = React.createClass ({
  render () {
    return (
      <div>
        <a onClick={this.props.back}>Cancel</a>
      </div>
    );
  }
});

const StoreLogin = connect(mapStateToProps)(Login);

export default StoreLogin;
