import {GETOTP_SEQUENCE,ON_OTP_FIELD_CHANGE} from "../actions/types";


const INITIAL_STATE ={
    MobileNumber:"",
    loading : false,
    error   : false,
    message : ""
}

export default (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case GETOTP_SEQUENCE:
            return {...state,loading:true,message:"",error:false}
        case ON_OTP_FIELD_CHANGE:
            return  { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state; 
    }
};