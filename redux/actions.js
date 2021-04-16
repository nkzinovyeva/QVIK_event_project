import axios from 'axios';
import {
  SETUP_URL,
  EVENTS_URL,
  RESTAURANT_URL,
  PRESENTERS_URL,
  STAGES_URL,
  VENUES_URL,
  UPDATE_URL
} from '../config';

// Define action types
export const GET_SETUP = 'GET_SETUP';
export const GET_UPDATE_TIMESTAMP = 'GET_UPDATE_TIMESTAMP';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const GET_PRESENTERS = 'GET_PRESENTERS';
export const GET_STAGES = 'GET_STAGES';
export const GET_VENUES = 'GET_VENUES';
export const ADD_TO_FAVOURITE_LIST = 'ADD_TO_FAVOURITE_LIST';
export const REMOVE_FROM_FAVOURITE_LIST = 'REMOVE_FROM_FAVOURITE_LIST';
export const FILTER_EVENTS_BY_TAG = 'FILTER_EVENTS_BY_TAG';
export const FILTER_RESTS_BY_TAG = 'FILTER_RESTS_BY_TAG';
export const SET_TIMESTAMP = 'SET_TIMESTAMP';
export const SET_UPDATE_TIMESTAMP = 'SET_UPDATE_TIMESTAMP';


//get setup information action
export const getSetUp = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${SETUP_URL}`);
      if (response.data) {
        dispatch({
          type: GET_SETUP,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // possible custom logic to handle errors
    console.log(error);
  }
};

//get last update info action
export const getLastUpdate = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${UPDATE_URL}`);
      if (response.data) {
        dispatch({
          type: GET_UPDATE_TIMESTAMP,
          payload: response.data.data.lastUpdateDateTime
        });
        console.log('BE last', response.data.data.lastUpdateDateTime);
      } else {
        console.log('Unable to fetch data from the API !');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//get sheduled events info action
export const getEvents = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${EVENTS_URL}`);
      if (response.data) {
        dispatch({
          type: GET_EVENTS,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API !');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//restaurants get info action
export const getRestaurants = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${RESTAURANT_URL}`);
      if (response.data) {
        dispatch({
          type: GET_RESTAURANTS,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API !');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//presenters get info action
export const getPresenters = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${PRESENTERS_URL}`);
      if (response.data) {
        dispatch({
          type: GET_PRESENTERS,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API !');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//stages get info action
export const getStages = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${STAGES_URL}`);
      if (response.data) {
        dispatch({
          type: GET_STAGES,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API !');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//stages get info action
export const getVenues = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${VENUES_URL}`);
      if (response.data) {
        dispatch({
          type: GET_VENUES,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API !');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//add-remove favourites actions
export const addFavourite = event => dispatch => {
  dispatch({
    type: ADD_TO_FAVOURITE_LIST,
    payload: event
  });
};

export const removeFavourite = event => dispatch => {
  dispatch({
    type: REMOVE_FROM_FAVOURITE_LIST,
    payload: event
  });
};

//filtering restaurants by tag action
export const filterRestsByTag = (tag, restaurantsArray) => dispatch => {

  if (tag.length > 0) {
    let temp = [];
    restaurantsArray.restaurants.filter((restaurant) => {
      let hasAllTags = true;
      tag.map((tag) => {
        if (!restaurant.allCuisines.includes(tag)) {
          hasAllTags = false;
        }
      });
      if (hasAllTags) {
        temp = [...temp, restaurant];
      }
    });
    restaurantsArray.restaurants = temp;
  }

  return dispatch({
    type: FILTER_RESTS_BY_TAG,
    payload: {
      tag: tag,
      items: restaurantsArray
    }
  });
};

//filtering events by tag action
export const filterEventsByTag = (tag, eventsArray) => dispatch => {

  if (tag.length > 0) {
    eventsArray.filter((events) => {
      let temp = [];
      events.data.filter((event) => {
        let hasAllTags = true;
        tag.map((tag) => {
          if (event.eventTags.includes(tag) || event.inheritedTags.includes(tag)) {
            //hasAllTags = true;
          } else {
            hasAllTags = false;
          }
        });
        if (hasAllTags) {
          temp = [...temp, event];
        }
      });
      events.data = temp;
    })
  }

  return dispatch({
    type: FILTER_EVENTS_BY_TAG,
    payload: {
      tag: tag,
      items: eventsArray
    }
  });
};

//set timestamp action
export const addTimestamp = time => dispatch => {
  //console.log('time', time)
  dispatch({
    type: SET_TIMESTAMP,
    payload: time
  });
};

//set last update timestamp action
export const setUpdateTimestamp = date => dispatch => {
  console.log('our last', date)
  dispatch({
    type: SET_UPDATE_TIMESTAMP,
    payload: date //format need to be agreed with the BE
  });
};