import {
    ACCOUNT_UPDATE,
  } from '../actions/types';
  
  const INITIAL_STATE = {
  list:[]
  };
  
  export default (state = INITIAL_STATE, action) => {
      console.log("@@@@action.......update",action)
    switch (action.type) {
      case ACCOUNT_UPDATE:
        return {list:action.payload};
      default:
        return state;
    }
  };
  