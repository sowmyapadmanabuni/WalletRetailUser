import {
    SHOW_PROFILE,
  } from '../actions/types';
  
  const INITIAL_STATE = {
  list:[]
  };
  
  export default (state = INITIAL_STATE, action) => {
      console.log("@@@@action.......",action)
    switch (action.type) {
      case SHOW_PROFILE:
        return {list:action.payload};
      default:
        return state;
    }
  };
  