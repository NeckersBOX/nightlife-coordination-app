import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const SignUp = React.createClass ({
  render () {
    return (
      <div>
        <a onClick={this.props.back}>Cancel</a>
      </div>
    );
  }
});

const StoreSignup = connect(mapStateToProps)(SignUp);

export default StoreSignup;
