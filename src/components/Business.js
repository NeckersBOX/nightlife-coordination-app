import React from 'react';

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
        <p>Rating {this.props.data.rating} <img src={this.props.data.rating_img_url} /></p>
        <a href={this.props.data.url}>Check this out</a>

        <p>{this.props.data.snippet_text}</p>
        <img src={this.props.data.snippet_image_url} />
      </div>
    );
  }
});

export default Business;
