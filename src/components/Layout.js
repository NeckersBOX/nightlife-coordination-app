import React from 'react';

const Layout = React.createClass ({
  render () {
    return (
      <div>
        <h1 className="text-center">Nightlife Coordination App</h1>
        <div className="text-center">
          <form className="search-location">
            <input type="text" placeholder="City - Ex. Rome" />
            <a>
              <i className="material-icons">location_on</i>
            </a>
          </form>
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
  }
});

export default Layout;
