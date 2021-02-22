import {
    GET_EVENTS,
    ADD_TO_FAVOURITE_LIST,
    REMOVE_FROM_FAVOURITE_LIST
  } from './actions';

const initialState = {
  events: [],
  favourites: [],
  parent: {title: "Night of art", venue: "Suvilahti", startDate: "2021-02-20", endDate: "2021-02-22"}
};

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
        return { ...state, events: action.payload };
    case ADD_TO_FAVOURITE_LIST:
        return { ...state, favourites: [...state.favourites, action.payload] };
    case REMOVE_FROM_FAVOURITE_LIST:
        return {
          ...state,
          favourites: state.favourites.filter(event => event.eventId !== action.payload.eventId)
        };
    default:
        return state;
    }
  }

export default eventsReducer;