import React from 'react';

const SearchForm = React.createClass ({
  getInitialState () {
    return { location: '' };
  },
  render () {
    return (
      <form className="search-location">
        <input onChange={(e) => this.setState ({ location: e.target.value })}
          type="text" placeholder="City - Ex. Rome" />
        <button type="submit" onClick={this.sendForm}>
          <i className="material-icons">location_on</i>
        </button>
      </form>
    );
  },
  sendForm (e) {
    e.preventDefault ();

    this.props.onClick (this.state.location);
  }
});

export default SearchForm;
