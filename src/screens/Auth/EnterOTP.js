import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import base from '../../base';
import Button from '../../components/common/Button';
import {GlobalStyle} from '../../components/common/GlobalStyle';
import OtpInputs from 'react-native-otp-inputs';
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
              <OtpInputs 
                inputStyles={{color: "black"}}
                keyboardType="numeric"
                containerStyles={{marginBottom: '20%', padding: 0}}
                handleChange={OTP => {
                  this.setState({otp: OTP});
                }} 
                numberOfInputs={6}
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
        const {MobileNumber} = this.props;
        console.log("Value"+this.state.otp);
        if (this.state.otp === '') {
          alert('Pleae Enter OTP'+this.state.otp);
        } else {
          alert("Hello"+otp);

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
    
