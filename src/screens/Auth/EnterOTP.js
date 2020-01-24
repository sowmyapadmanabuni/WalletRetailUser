import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import base from "../../base";
import Button from '../../components/common/Button';
import {GlobalStyle} from '../../components/common/GlobalStyle';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import OtpInputs from 'react-native-otp-inputs';
import ProgressLoader from 'rn-progress-loader';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {GenerateOTP, onOTPChangeText, VerifyOTP} from '../../actions';
import {connect} from 'react-redux';
import { EnterOTPStyle } from './EnterOTPStyle';
import api from "../../base/utils/strings";
import {GETOTP_SEQUENCE} from "../../actions/types";
import Toast from 'react-native-simple-toast';
import axios from 'axios';


class EnterOTP extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text1: '',
            otp: '',
            timer:60,
            visible: false,
            count: 0,
        };
    }

    timer(){
        this.time = setInterval(() => {
            this.setState({
                timer: this.state.timer - 1
            });
            console.log("timer::::::: ",this.state.timer);
            if (this.state.timer === 0){
                clearInterval(this.time);
                // this.setState({
                //     //timer : 10
                // })

                //clearInterval(this.time);
            }
        }, 1000);
    }

    componentDidMount() {
        //this.timer()
        this.time = setInterval(() => {
            this.setState({
                timer: this.state.timer - 1
            });
            console.log("timer::::::: ",this.state.timer);
            if (this.state.timer === 0){
                clearInterval(this.time);
                // this.setState({
                //     //timer : 10
                // })

                //clearInterval(this.time);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.time);
        //clearInterval(this.interval);
    }

    getOTP(){
        this.setState({
            timer : 60
        });
        this.timer();
        let country = this.props.navigation.state.params.data[0]
        let mob = this.props.navigation.state.params.data[1]
        let nav = this.props.navigation.state.params.data[2]
        // this.props.GenerateOTP(
        //     country,
        //     mob,
        //     nav,
        // );
        this.otp(country, mob)
    }


    otp(country, mob){
        axios
            .post(
                "http://apidev.oyespace.com/oyeliving/api/v1/account/resendotp" ,
                {
                    //Request Body
                    CountryCode : country,
                    MobileNumber: mob,
                },
                {
                    headers:{
                        "X-Champ-APIKey": "1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1",
                        "Content-Type": "application/json"
                    }

                }

            )
            .then(response => {
                console.log("GenerateOTP>>>RES: ", response);
                let data = response.data;
               Toast.show('OTP Sent Successfully', Toast.SHORT);
            })
            .catch(error => {
                console.log("GenerateOTP>>>ERROR: ", error, error.message);
                alert(error.message);
            });
    }



    render() {
        let check = base.regex.num;
        const {MobileNumber} = this.props;
        console.log("this.props.navigation ",this.props.navigation.state.params.data);
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

                    <View style={{
                        marginTop:'5%',
                        justifyContent:'center',
                        paddingLeft:'20%',
                        paddingRight:'20%',
                        height:'20%',
                    }}>
                        <OTPInputView
                            pinCount={6}
                            code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged = {(code) => {
                                this.setState({otp : code});
                            }}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            // onCodeFilled = {(code => {
                            //     console.log("CODE: ", code);
                            //     console.log(`Code is ${code}, you are good to go!`);
                            //     this.setState({otp : code});
                            //     this.EnterOTP()
                            // })}
                        />
                    </View>
                    {
                        this.state.timer !== 0 ?
                        <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end', marginRight:'20%', marginTop: '2%', }}>
                            <Text style={EnterOTPStyle.resendOTPTxtStyle}>Resend in </Text>
                            <Text style={[EnterOTPStyle.resendOTPTxtStyle, {fontWeight:'bold',}]}>{this.state.timer}</Text>
                            <Text style={EnterOTPStyle.resendOTPTxtStyle}> sec</Text>
                        </View>
                        :
                            <TouchableOpacity
                            onPress={()=> this.getOTP()}
                                style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end', marginRight:'20%', marginTop: '2%',}}>
                                <Text style={EnterOTPStyle.resendOTPTxtStyle}>Resend OTP </Text>
                            </TouchableOpacity>
                    }


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
                <ProgressLoader
                    visible={this.state.visible}
                    //visible={true}
                    isModal={true} isHUD={true}
                    hudColor={"transparent"}
                    color={base.theme.colors.orange} />
            </View>
            </View>
        );
    }

    EnterOTP = () => {
        console.log("EnterOTP>>>OTP ",this.state.otp);
        const {MobileNumber} = this.props;
        console.log("Value ",this.state.otp, MobileNumber);
        if (this.state.otp === '') {
            alert('Please Enter OTP'+this.state.otp);
        }
        else if (this.state.otp.length < 6){
            alert('Please enter 6 digits in OTP');
        }
        else {
            this.setState({visible:true})
            //alert("Hello");
            this.props.VerifyOTP(MobileNumber, this.state.otp, this.props.navigation);
            this.setState({visible:false})
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
    {onOTPChangeText, VerifyOTP, GenerateOTP},
)(EnterOTP);
    
