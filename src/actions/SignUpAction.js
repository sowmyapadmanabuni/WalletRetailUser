import {SIGNUP_SEQUENCE,ON_FIELD_CHANGE} from './types';
import axios from "axios"; 
import Toast from 'react-native-simple-toast';
import api from '../base/utils/strings';

export const onSignupFieldChange =({prop,value})=>{
    return(dispatch) =>{
        dispatch({
            type: ON_FIELD_CHANGE,
            payload: {prop,value}
        });
    };
};


export const Register =(FirstName,LastName,MobileNumber,Email,CountryCode,navigation)=>{
    return dispatch => {
      dispatch({ type: SIGNUP_SEQUENCE })
      console.log("FirstName",FirstName);
      console.log("LastName",LastName);
      console.log("MobileNumber",CountryCode+MobileNumber);

         axios.post(api.oyeWalletUrl+"CreateRegistration", {
     
        //Request Body 
        firstName        : FirstName,
        lastName         : LastName,
        mobileNumber     : CountryCode+MobileNumber,
        email            : Email,
        countryCode      : CountryCode,
        rewardsAvailable : 500,
        role             : "Retail User"
       
    }).

      then(response=>{
        
       let data = response.data; 
     
       dispatch({
         type:SIGNUP_SEQUENCE,
         payload:"Signed Up Successfully"      
       });

       Toast.show('Registered Successfully', Toast.SHORT);
       setTimeout(function(){
        // navigation.navigate("viewas")
        navigation.navigate("PayMerchant");
       },500)
     
        //  }
          })
      
     .catch(error => {      
        alert(error.message);
       console.log(error,);
      
     });
    }
    };
  


  