import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const SignUp = React.createClass ({
  getInitialState () {
    return {
      error: false,
      success: false,
      username: '',
      password: '',
      loading: false
    }
  },
  render () {
    return (
      <form className="signup-module">
        <h3>Sign Up</h3>
        {this.state.error ? <p className="error">Error: {this.state.error}</p> : ''}
        {this.state.success ? <p className="success">{this.state.success}</p> : ''}

        <label>
          Username <input type="text" onChange={(e) => this.setState ({ username: e.target.value })} />
        </label>
        <label>
          Password <input type="password" onChange={(e) => this.setState ({ password: e.target.value })} />
        </label>

        <div>
          <button type="submit" onClick={(e) => { e.preventDefault (); this.props.back (); }}
            disabled={this.state.loading}>
            Cancel
          </button>
          <button type="submit" onClick={(e) => { e.preventDefault (); this.sendModule (); }}
            disabled={this.state.loading}>
            Submit
          </button>
        </div>
      </form>
    );
  },
  sendModule () {
    let username = this.state.username.trim ();

    if ( username.length < 8 )
      return this.setState ({ error: 'Username minimum characters 8' });

    if ( this.state.password < 8 )
      return this.setState ({ error: 'Password minimum characters 8' });

    this.setState ({ loading: true });

    this.props.dispatch ({
      type: 'getJSON',
      url: '/signup',
      data: {
        username: username,
        password: this.state.password
      },
      callback: (result) => {
        if ( result.error )
          return this.setState ({ error: result.error, loading: false });

        this.setState ({ success: 'Your account was created!' });
        setTimeout (this.props.back, 3000);
      }
    });
  }
});

const StoreSignup = connect(mapStateToProps)(SignUp);

export default StoreSignup;
