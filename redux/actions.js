import axios from 'axios';
import { BASE_URL } from '../config';

// Define action types
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_TO_FAVOURITE_LIST = 'ADD_TO_FAVOURITE_LIST';
export const REMOVE_FROM_FAVOURITE_LIST = 'REMOVE_FROM_FAVOURITE_LIST';

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
      // Add custom logic to handle errors
      console.log(error);
    }
  };

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