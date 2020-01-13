import {combineReducers} from 'redux';
import OTPReducer from './OTPReducer';
import UserReducer from './UserReducer';
import SignUpReducer from './SignUpReducer';
import AccountUpdateReducer from './AccountUpdateReducer';
import ShowProfileReducer from './ShowProfileReducer'
export default combineReducers({
OTPReducer    : OTPReducer,
UserReducer   : UserReducer,
SignUpReducer : SignUpReducer,
AccountUpdateReducer:AccountUpdateReducer,
ShowProfileReducer:ShowProfileReducer
});