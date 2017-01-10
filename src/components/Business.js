import React from 'react';

const Rating = React.createClass ({
  render () {
    let stars = 0;
    let rating = [];

    for ( let stars = 0; stars < this.props.value; stars++ )
      rating.push (<i key={stars} className="material-icons">star</i>);

    if ( this.props.value - Math.floor (this.props.value) )
      rating.push (<i key={stars} className="material-icons">star_half</i>);

    for ( ++stars; stars < this.props.max; stars++ )
      rating.push (<i key={stars} className="material-icons">star_border</i>);
  }
});

const Business = React.createClass ({
  render () {
    console.log (this.props.data);
    return (
      <div>
        <h2>{this.props.data.name}</h2>
        <img src={this.props.data.image_url} alt={this.props.data.id} />

        <p>{this.props.data.is_closed ? 'CLOSED' : 'OPEN'}</p>

        {this.props.data.categories.map ((cat, idx) =>
          <span key={idx} className="result-badge">{cat[0]}</span>)}

        <p>Phone {this.props.data.display_phone}</p>
        <Rating value={this.props.rating} max={5} />
        <a href={this.props.data.url}>Check this out</a>

        <p>{this.props.data.snippet_text}</p>
        <img src={this.props.data.snippet_image_url} />
      </div>
    );
  }
});

export default Business;
