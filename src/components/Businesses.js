import React from 'react';

const Businesses = React.createClass ({
  render () {
    return (
      <div>
        {this.props.children}

        { ( !this.props.loading && !this.props.error ) ?
          <button onClick={this.props.loadMore} className="load-more">
            Load more business
          </button> : '' }
      </div>
    );
  }
});

export default Businesses;
