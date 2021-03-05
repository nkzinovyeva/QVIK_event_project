import axios from 'axios';
import { BASE_URL, RESTAURANT_URL } from '../config';


// Define action types
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_TO_FAVOURITE_LIST = 'ADD_TO_FAVOURITE_LIST';
export const REMOVE_FROM_FAVOURITE_LIST = 'REMOVE_FROM_FAVOURITE_LIST';
export const GET_PARENT = 'GET_PARENT';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const FILTER_EVENTS_BY_TAG = 'FILTER_EVENTS_BY_TAG';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

export const UPDATE_TAG = 'UPDATE_TAG';

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

  //add-remove tags actions
  export const addTag = tag => dispatch => {
    dispatch({
      type: ADD_TAG,
      payload: tag
    });
  };

  export const removeTag = tag => dispatch => {
    dispatch({
      type: REMOVE_TAG,
      payload: tag
    });
  };


 /*----CODE_BLOCK FOR FILTER TESTS---*/ 
 
  export const filterEvents = (events, tag) => dispatch => {
    console.log("---------LENTGH OF TAG ARRAY--------------");
    console.log(tag.length);
    // console.log("-------EVENTS BEFORE FILTER-------");
    // console.log(events);
    if(tag.length >0){
      
      events.subEvents.map((events)=>{
        let temp=[];
        events.data.map((event)=>{
          tag.map((tag)=>{
            if(event.tags.includes(tag)){
              temp = [...temp, event];
            }
          })
          
        });
        events.data = temp;
      })

      // console.log("-------EVENTS AFTER FILTER-------");
      // console.log(events);


      // events.map((events)=>{
      //   let temp=[];
      //   events.data.map((event)=>{
      //     console.log("-------ONE EVENT-------");
      //     console.log(event);
      //     let containTag = false;
      //     console.log("-------TAGS-------");
      //     console.log(tag);
      //     tag.map((oneTag)=>{
      //       console.log("-------ONE TAG-------");
      //       console.log(oneTag);
      //       console.log("-------TAG IN EVENT-------");
      //       console.log(event.tags);
      //       if(event.tags.includes(oneTag))
      //         containTag=true;
      //     });
      //     if(containTag){
      //       temp = [...temp, event];
      //     }
      //   });
      //   events.data = temp;
      //   console.log("------TEMP------------");
      //   console.log(temp);
      //   console.log("------EVENTS------------");
      //   console.log(events);
      // })
    }

    

    return dispatch({
      type: FILTER_EVENTS_BY_TAG,
      payload: {
        tag: tag,

        items : events

        //I tried with that but it doesn't work
        // items : tag === '' ? events : events.subEvents.map((events)=>{
        //   let temp=[];
        //   events.data.map((event)=>{
        //     tag.map((tag)=>{
        //       if(event.tags.includes(tag)){
        //         temp = [...temp, event];
        //       }
        //     })
            
        //   });
        //   events.data = temp;
        // })

        // items:tag === '' ? events : events.map((events)=>{
        //   let temp=[];
        //   events.data.map((event)=>{
        //     if(event.tags.includes(tag)){
        //       temp = [...temp, event];
        //     }
        //   });
        //   events.data = temp;
        // })
        
        //items:tag === '' ? events : events.filter(a => a.tags.indexOf(tag) >= 0)
    }
    });
  };

  export const updateTag = (tag, filteredEvents) => dispatch => {

    if(tag.length >0){
      
      filteredEvents.subEvents.map((events)=>{
        let temp=[];
        events.data.map((event)=>{
          tag.map((tag)=>{
            if(event.tags.includes(tag)){
              temp = [...temp, event];
            }
          })
          
        });
        events.data = temp;
      })
    }

    dispatch({
      type: UPDATE_TAG,
      payload: {
        tag: tag,
        items: filteredEvents
      }
    });
  };

  /*----end block for tests ---*/  