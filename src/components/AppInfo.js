import React from 'react';

const AppInfo = React.createClass ({
  render () {
    return (
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
    );
  }
});

export default AppInfo;
