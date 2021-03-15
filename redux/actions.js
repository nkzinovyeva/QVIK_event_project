import axios from 'axios';
import {
  BASE_URL,
  RESTAURANT_URL
} from '../config';

// Define action types
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_TO_FAVOURITE_LIST = 'ADD_TO_FAVOURITE_LIST';
export const REMOVE_FROM_FAVOURITE_LIST = 'REMOVE_FROM_FAVOURITE_LIST';
export const GET_PARENT = 'GET_PARENT';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const FILTER_RESTS_BY_TAG = 'FILTER_RESTS_BY_TAG';

//get events action
export const getEvents = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        dispatch({
          type: GET_EVENTS,
          payload: response.data.data
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
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

//parent event get info action
export const getParent = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        dispatch({
          type: GET_PARENT,
          payload: response.data.data.parentEvent
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
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

//filtering restaurants by tag action
export const filterRestsByTag = (tag, restaurantsArray) => dispatch => {

  if (tag.length > 0) {
    let temp = [];
    restaurantsArray.restaurants.filter((restaurant) => {
      let hasAllTags = true;
      tag.map((tag) => {
        if (!restaurant.allTags.includes(tag)) {
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

//filtering by tag action
export const filterByTag = (tag, eventsArray) => dispatch => {

  if (tag.length > 0) {
    eventsArray.subEvents.filter((events) => {
      let temp = [];
      events.data.filter((event) => {
        let hasAllTags = true;
        tag.map((tag) => {
          if (event.tags.includes(tag) || event.inheritedTags.includes(tag)) {
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
    type: FILTER_BY_TAG,
    payload: {
      tag: tag,
      items: eventsArray
    }
  });
};