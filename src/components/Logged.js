import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const Logged = React.createClass ({
  getInitialState () {
    return { error: false, loading: false };
  },
  render () {
    return (
      <div>
        <p>Welcome back {this.props.userAuth.name} - <a onClick={this.logout}>
          Logout {this.state.loading ? <div className="loading"></div> : ''}
        </a></p>
        {this.state.error ? <p className="text-secondary">Logout Error: {this.state.error}</p> : ''}
      </div>
    );
  },
  logout () {
    this.setState ({ loading: true, error: false });

    this.props.dispatch ({
      type: 'getJSON',
      url: '/logout',
      data: {
        token: this.props.userAuth.token
      },
      callback: (result) => {
        if ( result.error )
          return this.setState ({ error: result.error, loading: false });

        this.setState ({ loading: false });
        this.props.dispatch ({ type: 'USER_LOGOUT' });
      }
    });
  }
});

const StoreLogged = connect(mapStateToProps)(Logged);

export default StoreLogged;
