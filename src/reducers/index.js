import {combineReducers} from 'redux';
import OTPReducer from './OTPReducer';
import UserReducer from './UserReducer';
import SignUpReducer from './SignUpReducer';

export default combineReducers({
OTPReducer    : OTPReducer,
UserReducer   : UserReducer,
SignUpReducer : SignUpReducer,
});