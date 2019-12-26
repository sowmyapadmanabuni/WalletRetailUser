import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import base from '../../base';
import Button from '../../components/common/Button';
import {GlobalStyle} from '../../components/common/GlobalStyle';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import OtpInputs from 'react-native-otp-inputs';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {onOTPChangeText, VerifyOTP} from '../../actions';
import {connect} from 'react-redux';

class EnterOTP extends Component{
    constructor(props) {
        super(props);
        this.state = {
          text1: '',
          otp: '',
        };
      }
      render() {
        // const{OTP,text1}=this.props;
        return (
          <View style={{flex: 1}}>
            <Image
              style={{width: '100%'}}
              source={require('../../icons/login_img.png')}
            />
            <View style={GlobalStyle.overLayText}>
              <Text style={{color: base.theme.colors.white, fontSize: 18}}>
               
                <Text> </Text>Enter OTP
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop:'15%',
                
              }}>

                {/*<OtpInputs inputStyles={{color: "black",width:wp('8%'),
                }}
                           keyboardType="numeric"
                           containerStyles={{marginBottom: '20%', padding: 0,width:wp('85%')}}
                           handleChange={OTP => {
                               console.log("OTP: ", OTP);
                               this.setState({otp: OTP});
                           }}
                           numberOfInputs={6}
                />*/}




                <OTPInputView
                    style={{width: '80%', height: 200}}
                    pinCount={6}
                    //code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged = {code => {
                        this.setState({otp : this.state.otp+code})
                    }}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled = {(code => {
                        console.log(`Code is ${code}, you are good to go!`);
                        this.EnterOTP()
                    })}
                />




             <View style ={{marginTop:'15%',width:'60%'}}>
                  <Button style ={{width:'100%', alignItems:'center'}}
                    // style={styles.buttonposition}
                    textStyle ={{color:base.theme.colors.white}}
                    title="VERIFY AND PROCEED"
                    onPress={() => {
                      this.EnterOTP();
                  
                  //  this.props.navigation.navigate("signup");
                    }}
                  />
              </View>
            </View>
          </View>
        );
      }

      EnterOTP = () => {
        console.log("EnterOTP>>>OTP ",this.state.otp);
        const {MobileNumber} = this.props;
        console.log("Value"+this.state.otp);
        if (this.state.otp === '') {
          alert('Pleae Enter OTP'+this.state.otp);
        } else {
          alert("Hello");
          this.props.VerifyOTP(MobileNumber, this.state.otp, this.props.navigation);
        }
      };
    }
    
    export const styles = StyleSheet.create({
      buttonposition: {
        width: '70%',
        marginTop:'20%',
        alignItems: 'center',
        // color: base.theme.colors.black,
      },




        borderStyleBase: {
            width: 30,
            height: 45
        },

        borderStyleHighLighted: {
            borderColor: "#03DAC6",
        },

        underlineStyleBase: {
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomColor: base.theme.colors.black,
            borderBottomWidth: 1,
        },

        underlineStyleHighLighted: {
            //borderBottomColor: "#F7B844",
        },


    });
    
    const mapStateToProps = state => {
      return {
        MobileNumber: state.OTPReducer.MobileNumber,
        // otp          : state.OTPReducer.otp,
      };
    };
    export default connect(
      mapStateToProps,
      {onOTPChangeText, VerifyOTP},
    )(EnterOTP);
    
