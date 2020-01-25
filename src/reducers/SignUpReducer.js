import {
    SIGNUP_SEQUENCE,
    ON_FIELD_CHANGE,
  UPDATE_F_NAME,
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
    //console.log(">>>>>>ON_FIELD_CHANGE ",state, action.payload);
    console.log(">>>>>>ON_FIELD_CHANGE ", action);
    switch (action.type) {
      case SIGNUP_SEQUENCE:
        return {...state, loading: true, message: '', error: false};
      case ON_FIELD_CHANGE:
        this.j = action.payload.prop
        console.log("ON_FIELD_CHANGE ", ...state );
        return{...state, [action.payload.prop]: action.payload.value };
      case UPDATE_CONTACT_PAN_TYPE:
        return {...state, panType: action.payload};
      case UPDATE_F_NAME:
        return {
          FirstName : state
        };
      default:
        return state;
    }
  };
