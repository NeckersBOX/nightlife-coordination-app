import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store.js';
import Business from './Business';
import SearchForm from './SearchForm';
import Businesses from './Businesses';
import AppInfo from './AppInfo';
import TwitterLogin from './TwitterLogin';

const Layout = React.createClass ({
  getInitialState () {
    return { loading: false, error: false, data: null };
  },
  render () {
    return (
      <div>
        <div className="header text-center">
          <h1>Nightlife Coordination App</h1>
          <TwitterLogin />
        </div>

        <div className="text-center">
          { this.state.error ? <p className="text-accent">{this.state.error}</p> : '' }

          <SearchForm onClick={this.getNightlife} />

          <Businesses showButton={this.state.data && !this.state.loading} loadMore={this.loadMore}>
            { this.state.data ? this.state.data.map ((business, idx) =>
              <Business key={idx} {...business} />
            ) : '' }
          </Businesses>

          { this.state.loading ? <div className="loading"></div> : '' }
        </div>
        <AppInfo />
      </div>
    );
  },
  changeLoc (e) {
    this.setState ({ location: e.target.value });
  },
  getNightlife (location) {
    this.setState ({ loading: true, data: null });

    this.props.dispatch ({
      type: 'getJSON',
      url: '/locations',
      data: {
        location: location
      },
      callback: (result) => {
        if ( result.error )
          return this.setState ({ error: result.error, loading: false });

        if ( result.res.businesses.length ) {
          this.setState ({ data: result.res.businesses, loading: false });

          this.props.dispatch ({
            type: 'SET_LOCATION',
            data: location
          });

          return;
        }

        this.setState ({ error: 'No results found', loading: false });
      }
    });
  },
  loadMore () {
    this.setState ({ loading: true });

    this.props.dispatch ({
      type: 'getJSON',
      url: '/locations',
      data: {
        location: this.props.location,
        offset: this.state.data.length
      },
      callback: (result) => {
        if ( result.error )
          return this.setState ({ error: result.error, loading: false });

        this.setState ({
          loading: false,
          data: this.state.data.concat (result.res.businesses),
          error: false
        });
      }
    });
  }
});


const StoreLayout = connect(mapStateToProps)(Layout);

export default StoreLayout;
