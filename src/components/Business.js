import React from 'react';

const Rating = React.createClass ({
  render () {
    let stars = 0;
    let rating = [];

    for ( let stars = 0; stars < this.props.value; stars++ )
      rating.push (<i key={stars} className="material-icons">star</i>);
    console.log (this.props.value);
    if ( this.props.value - Math.floor (this.props.value) )
      rating.push (<i key={stars} className="material-icons">star_half</i>);

    for ( ++stars; stars < this.props.max; stars++ )
      rating.push (<i key={stars} className="material-icons">star_border</i>);

    return <span>{rating}</span>;
  }
});

const Business = React.createClass ({
  render () {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <img src={this.props.image_url} alt={this.props.id} />

        <p>{this.props.is_closed ? 'CLOSED' : 'OPEN'}</p>

        {this.props.categories.map ((cat, idx) =>
          <span key={idx} className="result-badge">{cat[0]}</span>)}

        <p>Phone {this.props.display_phone}</p>
        <Rating value={this.props.rating} max={5} />
        <a href={this.props.url}>Check this out</a>

        <p>{this.props.snippet_text}</p>
        <img src={this.props.snippet_image_url} />
      </div>
    );
  }
});

export default Business;
