import React from 'react';

const Business = React.createClass ({
  render () {
    console.log (this.props.data);
    return <h1>Business</h1>;
  }
});

export default Business;
