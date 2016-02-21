import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectVenueType, fetchPlacesIfNeeded } from './actions';
import Picker from './components/picker';
import Places from './components/places';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, venueType } = this.props;
    dispatch(fetchPlacesIfNeeded(venueType))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.venueType !== this.props.venueType) {
      const { dispatch, venueType } = nextProps;
      dispatch(fetchPlacesIfNeeded(venueType));
    }
  }

  handleChange(nextVenueType) {
    this.props.dispatch(selectVenueType(nextVenueType));
  }

  render() {
    const { venueType, places, isFetching } = this.props;
    const isEmpty = places.length === 0;
    return (
      <div>
        <Picker value={venueType}
                onChange={this.handleChange}
                options={[ 'pub', 'cafe' ]} />
        {(places.length === 0)
          ? (isFetching ? <h2>Loading...</h2> : <h2>Sorry we found no places!</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Places places={places} />
            </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  venueType: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { venueType, googlePlaces } = state;
  const {
    isFetching,
    items
  } = googlePlaces[venueType] || {
    isFetching: true,
    items: []
  }

  return {
    venueType,
    places,
    isFetching
  }
}

export default connect(mapStateToProps)(App);
