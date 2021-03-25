import {
  GET_SETUP,
  GET_EVENTS,
  GET_RESTAURANTS,
  GET_PRESENTERS,
  GET_STAGES,
  ADD_TO_FAVOURITE_LIST,
  REMOVE_FROM_FAVOURITE_LIST,
  FILTER_EVENTS_BY_TAG,
  FILTER_RESTS_BY_TAG,
  SET_TIMESTAMP,
  GET_VENUES
} from './actions';

const initialState = {
  setupData: {},
  events: [],
  eventTags: [],
  filteredEvents: [],
  restaurants: [],
  restsTags: [],
  filteredRests: [],
  favourites: [],
  stages: [],
  presenters: [],
  timestamp: {},
  venues: []
};

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETUP:
      return { ...state, setupData: action.payload };
    case GET_EVENTS:
      return { ...state, events: action.payload };
    case GET_RESTAURANTS:
      return { ...state, restaurants: action.payload };
    case GET_PRESENTERS:
      return { ...state, presenters: action.payload };
    case GET_STAGES:
      return { ...state, stages: action.payload };
    case GET_VENUES:
      return { ...state, venues: action.payload };
    case ADD_TO_FAVOURITE_LIST:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case REMOVE_FROM_FAVOURITE_LIST:
      return {
        ...state,
        favourites: state.favourites.filter(event => event.eventId !== action.payload.eventId)
      };
    case FILTER_EVENTS_BY_TAG:
      return { ...state, eventTags: action.payload.tag, filteredEvents: action.payload.items }
    case FILTER_RESTS_BY_TAG:
      return { ...state, restsTags: action.payload.tag, filteredRests: action.payload.items }
    case SET_TIMESTAMP:
      return { ...state, timestamp: action.payload };
    default:
      return state;
  }
}

export default eventsReducer;