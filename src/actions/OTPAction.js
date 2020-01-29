import {GETOTP_SEQUENCE, ON_OTP_FIELD_CHANGE, UPDATE_lOGGEDIN, UPDATE_USER_INFO} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import api from '../base/utils/strings';
import {Alert} from 'react-native';

export const onOTPChangeText = ({prop, value}) => {
    return dispatch => {
        dispatch({
            type: ON_OTP_FIELD_CHANGE,
            payload: {prop, value},
        });
    };
};

export const GenerateOTP = (CountryCode, MobileNumber, navigation) => {
    console.log("DATA: ",CountryCode, MobileNumber, navigation);
    return dispatch => {

      dispatch({type: GETOTP_SEQUENCE});
      //console.log(api.oyeWalletUrl+'generateAndSendOTP');
      console.log("GenerateOTP>>>DATA: ",CountryCode, MobileNumber);
        let l = [CountryCode, MobileNumber, navigation];
     return axios
        .post(
          // 'https://uatwalletapi.azurewebsites.net/wallet/api/v1/generateAndSendOTP',
          // 'http://oyewalletpro.southindia.cloudapp.azure.com/wallet/api/v1/generateAndSendOTP',
          api.oyeWalletUrl+'generateAndSendOTP',
          {
            //Request Body
            countryCode : CountryCode,
            mobileNumber: MobileNumber,
          },
        )
        .then(response => {
          let data = response.data;
          console.log("GenerateOTP>>>res ",response);
          dispatch({
            type: GETOTP_SEQUENCE,
            payload: 'OTP Sent Successfully',
          });
          Toast.show('OTP Sent Successfully', Toast.SHORT);
          setTimeout(function() {
            navigation.navigate('EnterOtp',{data:l} );

          }, 500);
        })
        .catch(error => {
            console.log("GenerateOTP>>>error ",error);
          alert(error.message);
        });
    };
  };

  export const VerifyOTP = (MobileNumber, Otp, navigation) => {
      console.log("VerifyOTP>>> MobileNumber, Otp, navigation", MobileNumber, Otp, navigation);

    return dispatch => {
        console.log(api.oyeWalletUrl + 'verifyOTP');
        console.log('mobile', MobileNumber);
        console.log('otp', Otp);

        dispatch({type: GETOTP_SEQUENCE});
        //navigation.navigate('Signup');

        axios
            .post(
                api.oyeWalletUrl + 'verifyOTP/Retail User',
                //"http://devapi.oyewallet.com/wallet/api/v1/verifyOTP/Retail User",
                {
                    "mobileNumber" : '+91'+MobileNumber,
                    "otpNumber"    :Otp
                })
            .then(response => {
                console.log("VerifyOTP>>>response 1", response);

                console.log(response.data.data.errorMessage);
                if (
                    response.data.data.errorMessage === "INVALID DETAILS"
                    //|| !response.data.success
                ){
                    Alert.alert("Alert","Wrong OTP");
                }
                else if (response.data.data.errorMessage === 'NEW USER') {
                    // let data = response.data.data[0];
                    // console.log("data.registrationId ", data);
                    // let payloadArr = [
                    // ]
                    // dispatch({
                    //     type:UPDATE_USER_INFO,
                    //     payload:data
                    // })
                    // dispatch({
                    //     type: GETOTP_SEQUENCE,
                    //     payload: 'OTP Verified Successfully',
                    // });
                    navigation.navigate('Signup');
                }
                else {
                    console.log(">>>UserReducer----------> ");
                    console.log("VerifyOTP>>>response 2", response);
                    let data = response.data.data[0];
                    console.log("data.registrationId ", data);
                    let payloadArr = [
                    ]
                   /* dispatch({
                        type:UPDATE_lOGGEDIN,
                        payload:true
                    });*/

                   dispatch({
                        type:UPDATE_USER_INFO,
                        payload:data
                    });

                    dispatch({
                        type: GETOTP_SEQUENCE,
                        payload: 'OTP Verified Successfully',
                    });
                   dispatch({
                        type:UPDATE_lOGGEDIN,
                        payload:true,
                       // payload:({prop:"loggedIn",value:true})
                    })
                    console.log("VerifyOTP>>>data ", data);
                    if (data.role === 'Retail User') {
                        //alert("Number Exists");
                       // navigation.navigate('Profile');
                       navigation.navigate('DefaultOrCustom');
                       // navigation.navigate('PayMerchant');

                    } else {
                        alert("Number dont know")
                    }
                }


            })
            .catch(error => {
                console.log('Error', error);
                alert(error.message);
            });

    };
};

