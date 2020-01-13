import {GETOTP_SEQUENCE, ON_OTP_FIELD_CHANGE} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import api from '../base/utils/strings';


export const onOTPChangeText = ({prop, value}) => {
    return dispatch => {
      dispatch({
        type: ON_OTP_FIELD_CHANGE,
        payload: {prop, value},
      });
    };
  };
  
  export const GenerateOTP = (CountryCode, MobileNumber, navigation) => {
    return dispatch => {
      dispatch({type: GETOTP_SEQUENCE});
      console.log(api.oyeWalletUrl+'generateAndSendOTP');
      console.log("countryCode:"+ CountryCode);
      console.log("MobileNumber"+ MobileNumber);
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
          dispatch({
            type: GETOTP_SEQUENCE,
            payload: 'OTP Sent Successfully',
          });
          Toast.show('OTP Sent Successfully', Toast.SHORT);
          setTimeout(function() {
            navigation.navigate('EnterOtp');
           
          }, 500);
        })
        .catch(error => {
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
        navigation.navigate('PayMerchant');
        //navigation.navigate('CardDetails');

            dispatch({type: GETOTP_SEQUENCE});
            axios
                .post(api.oyeWalletUrl + 'verifyOTP', {
                    //Request Body
                    mobileNumber: '+91' + MobileNumber,
                    otpNumber: Otp,
                })
                .then(response => {
                    console.log("VerifyOTP>>>response 1", response);
                    console.log(response.data.data.errorMessage);
                    if (response.data.data.errorMessage === 'NEW USER') {
                        navigation.navigate('Signup');

                    } else {
                        console.log("VerifyOTP>>>response 2", response);
                        let data = response.data.data[0];
                        dispatch({
                            type: GETOTP_SEQUENCE,
                            payload: 'OTP Verified Successfully',
                        });
                        console.log("VerifyOTP>>>data ", data)
                        if (data.role === 'Retail User') {
                            alert("Number Exists")
                            navigation.navigate('PayMerchant');
                        } else {
                            alert("Number dontknow")
                        }
                    }


                })
                .catch(error => {
                    console.log('Error', error);

                    alert(error.message);
                });

    };
  };
  