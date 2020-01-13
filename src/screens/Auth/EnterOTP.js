import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
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
            timer:60,
        };
      }

      timer(){
          this.interval = setInterval(
              () => {

                  this.setState((prevState)=> ({ timer: prevState.timer - 1 }))
                  console.log("timer ",this.state.timer);
                  if (this.state.timer === 0)
                      clearInterval(this.interval);
              },
              1000
          );
          setTimeout(() => {

              //return i
          }, 3000);
      }

    componentDidMount() {
        this.timer()
    }

    componentWillUnmount() {
          clearInterval(this.interval);
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

                <View>
                    <Text style={{
                        fontSize: 20,
                        color:"#F4CC81"
                    }}>Enter OTP received</Text>
                </View>

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



                <View style={{
                    marginTop:'5%',
                    justifyContent:'center',
                    paddingLeft:'20%',
                    paddingRight:'20%',
                    height:'20%',
                }}>
                    <OTPInputView
                        style={{
                            //backgroundColor:'yellow',
                            //width: '80%',
                            //height: '20%'
                        }}
                        pinCount={6}
                        //code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged = {code => {
                            
                        }}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled = {(code => {
                            console.log(`Code is ${code}, you are good to go!`);
                            this.setState({otp : code})
                            this.EnterOTP()
                        })}
                    />
                </View>
                <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end', marginRight:'20%', marginTop: '2%'}}>
                    <Text style={{fontsize:10}}>Resend in </Text>
                    <Text style={{fontsize:10, }}>{this.state.timer}</Text>
                    <Text style={{fontsize:10}}>sec</Text>
                </View>




                  <TouchableOpacity style ={{alignSelf:'center',marginTop:'15%'}}
                    // style={styles.buttonposition}
                    // textStyle ={{color:base.theme.colors.white}}
                    // title="VERIFY AND PROCEED"
                    onPress={() => {
                      this.EnterOTP();
                  
                  //  this.props.navigation.navigate("signup");
                    }}
                  >
                    <Text style ={{color:base.theme.colors.orange}}>VERIFY AND PROCEED</Text>
                    </TouchableOpacity>
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
    
