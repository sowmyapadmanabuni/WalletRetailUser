import {
    SIGNUP_SEQUENCE,
    ON_FIELD_CHANGE,
    UPDATE_CONTACT_PAN_TYPE,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    FirstName: '',
    LastName: '',
    Email: '',
    MobileNumber: '',
    loading: false,
    error: false,
    message: '',
    panType: '',
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGNUP_SEQUENCE:
        return {...state, loading: true, message: '', error: false};
      case ON_FIELD_CHANGE:
        return{...state, [action.payload.prop]: action.payload.value };

      case UPDATE_CONTACT_PAN_TYPE:
        return {...state, panType: action.payload};
      default:
        return state;
    }
  };
  