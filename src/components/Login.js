import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const Login = React.createClass ({
  getInitialState () {
    return {
      error: false,
      username: '',
      password: '',
      loading: false
    }
  },
  render () {
    return (
      <form className="login-module">
        <h3>Login</h3>
        {this.state.error ? <p className="error">Error: {this.state.error}</p> : ''}

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
            Login
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
      url: '/login',
      data: {
        username: username,
        password: this.state.password
      },
      callback: (result) => {
        if ( result.error )
          return this.setState ({ error: result.error, loading: false });

        this.props.dispatch ({
          type: 'USER_LOGIN',
          data: result
        });
      }
    });
  }
});

const StoreLogin = connect(mapStateToProps)(Login);

export default StoreLogin;
