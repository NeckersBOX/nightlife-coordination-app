import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const TwitterLogin = React.createClass ({
  render () {
    return (
      <div>
        <p>Login with <a onClick={this.twitterLogin}>Twitter</a></p>
      </div>
    )
  },
  twitterLogin () {

  }
});

const StoreTwitterLogin = connect(mapStateToProps)(TwitterLogin);

export default StoreTwitterLogin;
