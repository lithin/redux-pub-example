import fetch from 'isomorphic-fetch';

export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const SELECT_TYPE = 'SELECT_TYPE';

export function selectVenueType(venueType) {
  return {
    type: SELECT_TYPE,
    venueType
  };
}

function requestPlaces(venueType) {
  return {
    type: REQUEST_PLACES,
    venueType
  };
}

function receivePlaces(venueType, json) {
  console.log(json)
  return {
    type: RECEIVE_PLACES,
    venueType,
    places: json.data.children.map(child => child.data)
  };
}

function fetchPlaces(venueType) {
  return dispatch => {
    dispatch(requestPlaces(venueType));
    return fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        body: {
          key: 'AIzaSyAb0IEEeVY2XLnNf34tb9H_yfZxGxc0Ce8',
          location: '51.5265,0.0825',
          radius: 1000,
          keyword: venueType
        }
      })
      .then(response => response.json())
      .then(json => dispatch(receivePlaces(venueType, json)));
  };
}

function shouldFetchPlaces(state, venueType) {
  const places = state.googlePlaces[venueType];
  if (!places) {
    return true;
  }
  return false;
}

export function fetchPostsIfNeeded(venueType) {
  return (dispatch, getState) => {
    if (shouldFetchPlaces(getState(), venueType)) {
      return dispatch(fetchPlaces(venueType));
    }
  };
}
