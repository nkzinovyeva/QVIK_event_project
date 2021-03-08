import {
    GET_EVENTS,
    ADD_TO_FAVOURITE_LIST,
    REMOVE_FROM_FAVOURITE_LIST,
    GET_PARENT,
    GET_RESTAURANTS,
    //FILTER_EVENTS_BY_TAG,
    //ADD_TAG,
    //REMOVE_TAG,
    UPDATE_TAG
  } from './actions';

const initialState = {
  events: [],
  favourites: [],
  parent: {},
  restaurants: [],
  filteredEvents: [],
  tag: []
};

function eventsReducer(state = initialState, action) {
  switch (action.type) { 
    case GET_EVENTS:
        return { ...state, events: action.payload, filteredEvents: action.payload };
    case GET_PARENT:
        return { ...state, parent: action.payload };
    case GET_RESTAURANTS:
      return { ...state, restaurants: action.payload };
    case ADD_TO_FAVOURITE_LIST:
        return { ...state, favourites: [...state.favourites, action.payload] };
    case REMOVE_FROM_FAVOURITE_LIST:
        return {
          ...state,
          favourites: state.favourites.filter(event => event.eventId !== action.payload.eventId)
        };
    /*case FILTER_EVENTS_BY_TAG:
          return { ...state, filteredEvents: action.payload.items, tag: action.payload.tag  };
    case ADD_TAG:
        return { ...state, tag: [...state.tag, action.payload] };
    case REMOVE_TAG:
      return {
        ...state,
        tag: state.tag.filter(item => item !== action.payload.tag)
      };*/
      case UPDATE_TAG:
        return { ...state, tag: action.payload.tag, filteredEvents: action.payload.items}
    default:
        return state;
    }
  }

export default eventsReducer;