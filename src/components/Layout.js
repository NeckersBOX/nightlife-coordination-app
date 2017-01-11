import React from 'react';
import Business from './Business';

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

          <form className="search-location">
            <input onChange={this.changeLoc} type="text" placeholder="City - Ex. Rome"
              disabled={this.state.loading} />
            <a className={this.state.loading ? 'disabled' : ''} onClick={this.getNightlife}>
              <i className="material-icons">location_on</i>
            </a>
          </form>

          { this.state.data ? this.state.data.map ((business, idx) =>
              <Business key={idx} {...business} />
            ) : '' }
          { (this.state.data && !this.state.loading) ? <button onClick={this.loadMore} className="load-more">Load more business</button> : ''}
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
  getNightlife () {
    this.setState ({ loading: true, data: null });

    let request = new XMLHttpRequest ();
    request.open ('POST', '/locations', true);
    request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = () => {
      if ( request.status != 200 )
        return this.setState ({ error: request.status + ' ' + request.statusText, loading: false });

      let data = JSON.parse (request.responseText);
      if ( data.error )
        return this.setState ({ loading: false, error: data.error });

      if ( data.res.businesses.length )
        this.setState ({ loading: false, data: data.res.businesses, error: false });
      else this.setState ({ loading: false, error: 'No results found.' });
    };

    request.onerror = () => console.error ('POST /locations. Request failed.');
    request.send ('location=' + this.state.location);
  },
  loadMore () {
    this.setState ({ loading: true });
    let request = new XMLHttpRequest ();
    request.open ('POST', '/locations', true);
    request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = () => {
      if ( request.status != 200 )
        return this.setState ({ error: request.status + ' ' + request.statusText, loading: false });

      let data = JSON.parse (request.responseText);
      if ( data.error )
        return this.setState ({ loading: false, error: data.error });

      if ( data.res.businesses.length )
        this.setState ({ loading: false, data: this.state.data.concat (data.res.businesses), error: false });
      else this.setState ({ loading: false, error: 'No results found.' });
    }

    request.onerror = () => console.error ('POST /locations. Request failed.');
    request.send ('location=' + this.state.location + '&offset=' + this.state.data.length);
  }
});

export default Layout;
