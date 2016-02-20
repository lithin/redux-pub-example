import React, { PropTypes, Component } from 'react';

export default class Places extends Component {
  render() {
    return (
      <ul>
        {this.props.places.map((place, i) =>
          <li key={i}>{place.title}</li>
        )}
      </ul>
    );
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired
};