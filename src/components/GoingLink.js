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
      <a onClick={this.toggleGoing}>
        {this.state.loaded ?
          this.state.usersGoing + ' Going' :
          <div className="loading-small"></div>}
      </a>
    );
  },
  toggleGoing () {
    console.log ('Check ' + this.props.id);
  }
});

const StoreGoingLink = connect(mapStateToProps)(GoingLink);

export default StoreGoingLink;
