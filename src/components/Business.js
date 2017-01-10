import React from 'react';

const Rating = React.createClass ({
  render () {
    let half = (this.props.value - Math.floor (this.props.value)) != 0;
    let rating = new Array (Math.floor (this.props.value)).fill ().map (
      (val, idx) => <i key={'star' + idx} className="material-icons">star</i>
    );

    if ( half )
      rating.push (<i key={'half-star'} className="material-icons">star_half</i>);

    rating = rating.concat (new Array (this.props.max - Math.ceil (this.props.value)).fill ().map (
      (val, idx) => <i key={'empty-star' + idx} className="material-icons">star_border</i>
    ));

    return <span>{rating}</span>;
  }
});

const Business = React.createClass ({
  render () {
    let snippet = (
      <div className="snippet">
        <p>
          <img src={this.props.snippet_image_url} />
          {this.props.snippet_text}
        </p>
      </div>
    );

    return (
      <div className="result-box">
        <h2>{this.props.name} <Rating value={this.props.rating} max={5} /></h2>
        {this.props.image_url ? <img src={this.props.image_url} alt={this.props.id} /> : ''}

        <div>
          {this.props.categories.map ((cat, idx) =>
            <span key={idx} className="badge">{cat[0]}</span>)}

          <p>Phone {this.props.display_phone}</p>
          <a href={this.props.url}>Show on Yelp</a>
        </div>

        {(this.props.snippet_image_url && this.props.snippet_text) ? snippet : ''}
      </div>
    );
  }
});

export default Business;
