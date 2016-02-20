import { combineReducers } from 'redux';
import {
  REQUEST_PLACES, RECEIVE_PLACES,
  SELECT_TYPE
} from './actions';

function venueType(state = 'pub', action) {
  switch (action.type) {
    case SELECT_TYPE:
      return action.venueType;
    default:
      return state;
  }
}

function places(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_PLACES:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_PLACES:
      return {
        ...state,
        isFetching: false,
        items: action.places
      };
    default:
      return state;
  }
}

function googlePlaces(state = {}, action) {
  switch (action.type) {
    case REQUEST_PLACES:
    case RECEIVE_PLACES:
      return {
        ...state,
        [action.venueType]: places(state[action.venueType], action)
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  googlePlaces,
  venueType
});

export default rootReducer;
