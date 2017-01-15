import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';

const GoingLink = React.createClass ({
  getInitialState () {
    return { loaded: false, usersGoing: 0 };
  },
  componentDidMount () {
    this.props.dispatch ({
      type: 'getJSON',
      url: '/users-going',
      data: {
        id: this.props.id
      },
      callback: (result) => {
        if ( result.error )
          return console.error (result.error);

        this.setState ({ loaded: true, usersGoing: result.usersGoing });
      }
    });
  },
  render () {
    return (
      <a onClick={this.props.userAuth ? this.toggleGoing : null}>
        {this.state.loaded ? this.state.usersGoing + ' Going' : 'Loading..' }
      </a>
    );
  },
  toggleGoing () {
    this.setState ({ loaded: false });

    this.props.dispatch ({
      type: 'getJSON',
      url: '/toggle-user-preference',
      data: {
        userToken: this.props.userAuth.token,
        userName: this.props.userAuth.name,
        businessId: this.props.id
      },
      callback: (result) => {
        if ( result.error )
          return console.error (result.error);

        this.setState ({
          loaded: true,
          usersGoing: this.state.usersGoing + result.toggle
        });
      }
    });
  }
});

const StoreGoingLink = connect(mapStateToProps)(GoingLink);

export default StoreGoingLink;
