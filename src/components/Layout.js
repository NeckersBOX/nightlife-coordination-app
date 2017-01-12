import React from 'react';
import Business from './Business';
import SearchForm from './SearchForm';

const Layout = React.createClass ({
  getInitialState () {
    return { location: '', loading: false, error: false, data: null };
  },
  render () {
    return (
      <div>
        <h1 className="text-center">Nightlife Coordination App</h1>
        <div className="text-center">
          { this.state.error ? <p className="text-accent">{this.state.error}</p> : '' }

          <SearchForm onClick={this.getNightlife} />

          { this.state.data ? this.state.data.map ((business, idx) =>
              <Business key={idx} {...business} />
            ) : '' }
          { (this.state.data && !this.state.loading) ?
            <button onClick={this.loadMore} className="load-more">Load more business</button> : ''}
          { this.state.loading ? <div className="loading"></div> : '' }
        </div>
        <div>
          <p className="text-center">
            <a href="https://github.com/NeckersBOX/nightlife-coordination-app">
              <small>GitHub Project</small>
            </a>
          </p>
          <p className="text-center text-secondary">
            <small>Written by Davide Francesco Merico</small>
          </p>
          <p className="text-center text-secondary">
            <small>Powered by <b>Yelp API</b></small>
          </p>
        </div>
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

export default Layout;
