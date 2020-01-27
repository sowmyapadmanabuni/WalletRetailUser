import { UPDATE_USER_INFO, UPDATE_lOGGEDIN} from '../actions/types'

const INITIAL_STATE = {
    loggedIn: false,
    userDetails: null,
    registrationId: null,
};

export default (state = INITIAL_STATE, action) => {
    console.log("NSJHDVKJDVVK:",action)
    switch (action.type) {
        case UPDATE_USER_INFO:
            console.log(">>>>>>>>>>>>> UPDATE_USER_INFO");
            return {...state, 'registrationId': action.payload.registrationId};
           // return {...state, 'loggedIn': action.payload.loggedIn};
        case UPDATE_lOGGEDIN:
            console.log(">>>>>>>>>>>>> UPDATE_lOGGEDIN",action);
            // return {...state, 'loggedIn': action.payload.loggedIn};
            return {...state, 'loggedIn': action};
        default:
            return state;
    }
};
