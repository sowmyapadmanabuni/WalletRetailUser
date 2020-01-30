import {
  SIGNUP_SEQUENCE,
  ON_FIELD_CHANGE,
  ACCOUNT_UPDATE,
  SHOW_PROFILE,
  ON_OTP_FIELD_CHANGE,
  UPDATE_lOGGEDIN
} from './types';
import axios from "axios";
import Toast from 'react-native-simple-toast';
import api from '../base/utils/strings';
import base from "../base";

export const onSignupFieldChange = ({ prop, value }) => {
  console.log("prop, value", prop, value);
  return (dispatch) => {
    dispatch({
      type: ON_FIELD_CHANGE,
      payload: { prop, value }
    });
  };
};

export const Register = (FirstName, LastName, MobileNumber, Email, CountryCode, navigation,gender,dob) => {
  console.log("response>>>SIGNUP@@@@@@", FirstName, LastName, MobileNumber, Email, CountryCode,gender,dob)
  return async dispatch => {
    dispatch({type: SIGNUP_SEQUENCE})
    console.log("FirstName", FirstName);
    console.log("LastName", LastName);
    console.log("MobileNumber", CountryCode + MobileNumber);
  //  let response = await base.service.api.registration(data);


    axios.post(api.oyeWalletUrl + "CreateRegistration", {

      //Request Body
      firstName: FirstName,
      lastName: LastName,
      mobileNumber: MobileNumber,
      email: Email,
      countryCode: CountryCode,
      // rewardsAvailable: 500,
      role: "Retail User",
      gender: gender === 0 ? "Male" : "Female",
      DOB: dob,
      //isMarried:marStatus===0?"Yes":"No",
      // noOfKids:numChild,
      // anniversaryDate:anniDate

    }).then(response => {
      console.log("response>>>SIGNUP######", response)
      let data = response.data;


      dispatch({
        type: SIGNUP_SEQUENCE,
        payload: "Signed Up Successfully"
      });
      dispatch({
        type: UPDATE_lOGGEDIN,
        payload: true,
        // payload:({prop:"loggedIn",value:true})
      })

      Toast.show('Registered Successfully', Toast.SHORT);
      setTimeout(function () {
        // navigation.navigate("viewas")
        //navigation.navigate("PayMerchant");
        navigation.navigate("DefaultOrCustom");
      }, 500)
      //  }
    })

        .catch(error => {
          alert(error.message);
          console.log(error);

        });
  }
};

export const Update = (data, navigation) => {
  console.log("inside update..........", data)
  return dispatch => {
    dispatch({ type: ACCOUNT_UPDATE })
    console.log("inside update..........2", data)
    var userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      email: data.email,
      countryCode: "+91",
      // rewardsAvailable : 500,
      registrationId:data.registrationId,
      role: "Retail User",
      gender:data.gender,
      DOB:data.DOB,
     // isMarried:data.isMarried,
     // noOfKids:data.noOfKids,
      //anniversaryDate:data.anniversaryDate
    }

    console.log("userData........", userData);

    let options = {
      method:'put',
      url:api.oyeWalletUrl +'UpdateProfile',

     // url:"http://devapi.oyewallet.com/wallet/api/v1/UpdateProfile",
      data:userData
    };

    return axios(options).then((response)=>{
      console.log("New PUT METHOD:",response)
      let data = response.data;
      dispatch({
        type: ACCOUNT_UPDATE,
        payload: data

      });
      return data
    }).catch(error=>{
      alert(error.message);
      console.log("New PUT METHOD Error:",error)
    })


    // return axios.put('http://devapi.oyewallet.com/wallet/api/v1/UpdateProfile'
    //   , userData).
    //
    //   then(response => {
    //     console.log("UPDATE response..........", response)
    //     let data = response.data;
    //     dispatch({
    //       type: ACCOUNT_UPDATE,
    //       payload: data
    //     });
    //     return data
    //   })
    //
    //   .catch(error => {
    //     alert(error.message);
    //     console.log(error);
    //
    //   });
  }
};

export const ShowProfile = (number) => {
  console.log("inside disptch........profile", number)



  return dispatch => {
    dispatch({ type: SHOW_PROFILE })
    // var number1=''
    console.log("inside disptch........profile", '91' + number)
    var number1 = '91' + number
    console.log("inside disptch........number1", number1)
    //'http://devapi.oyewallet.com/wallet/api/v1/GetProfileDetailsByMobileNumber/'+number1

    return axios.get(api.oyeWalletUrl+'GetProfileDetailsByMobileNumber/'+number1).
    then(response => {
        console.log("ShopProfile response..........", response)
      var data = response.data;
        dispatch({
          type: SHOW_PROFILE,
          payload:data
        });

        return data
      })

      .catch(error => {
        alert(error.message);
        console.log(error);

      });
  }
};
