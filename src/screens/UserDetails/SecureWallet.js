import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Dimensions,
    BackHandler,
    Platform,
    Alert,
    TouchableOpacity,
    AsyncStorage, Linking,
} from 'react-native';
import base from "../../base";
//import storage from "../../../utils/storage";
import Button from '../../components/common/Button';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from "react-native-cardview";
import AndroidOpenSettings from 'react-native-android-open-settings';
import OpenSecuritySettings from 'react-native-open-security-settings';

import { connect } from "react-redux";
import TouchID from "react-native-touch-id";
import LocalAuth from 'react-native-local-auth';
import {updateLoggedIn,updateUserInfo} from "../../actions";

class SecureWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressStatus: false,
            isButton: true,
            pp: ''

        }
    }

    /* handleBackPress = () => {
         if (this.props.navigation.state.params !== undefined) {
             this.props.navigation.navigate('Dashboard')
         } else {
             BackHandler.exitApp()
         }
         return true;
     }*/
    /* selectSecurity(){
         if(Platform.OS == 'android'){
             console.log("vvvvvvvvvvv");
             OpenSecuritySettings.openSecuritySettings()
         }else{
             Linking.openURL('app-settings')
         }
     }*/

    async passCodeField() {
        console.log("passCodeFieldpassCodeFieldpassCodeFieldpassCodeField");
        let self = this;
        //     base.storage.storeData('defaultAuthenticationType', 'Password');

        //const { userDetails } = this.props;

        //let data = userDetails;

        try {
            LocalAuth.authenticate({

                reason: 'this is a secure area, please authenticate yourself',
                fallbackToPasscode: true,    // fallback to passcode on cancel
                suppressEnterPassword: true // disallow Enter Password fallback
            })
                .then(async success => {
                    self.setState({ isButton: false });
                    updateLoggedIn({ prop: 'loggedIn', value: true })

                    self.props.navigation.navigate('PayMerchant');


                })
                .catch(error => {

                    //this.passCodeFail();
                    console.log("error", error);
                    // alert('Authentication Failed', error.message)
                })
        }
        catch (e) {
            console.log((e))
        }

    }

    async selectSecurity() {
        let self = this;
        const optionalConfigObject = {
            unifiedErrors: false,
            passcodeFallback: true,
        };
       // const { userDetails } = this.props;
        //let data = userDetails;

        if(Platform.OS==='android'){
            console.log("Checking defaultSecurity")
            let isSecure = await OpenSecuritySettings.isDeviceSecure()
            console.log("OpenSecuritySettings.isDeviceSecure",isSecure)
            if(isSecure){
                self.passCodeField()
            }else{
                OpenSecuritySettings.openSecuritySettings()
            }
        }else {

            TouchID.isSupported(optionalConfigObject).then(biometryType => {
                console.log("111111", biometryType);
                //self.props.navigation.navigate("Security")
                TouchID.authenticate('OyeWallet', optionalConfigObject)
                    .then(async success => {
                        updateLoggedIn({ prop: 'loggedIn', value: true })

                        self.props.navigation.navigate('PayMerchant');

                    })
                    .catch((e) => {

                    })

            })
                .catch(error => {
                    if (Platform.OS == 'android') {
                        console.log("vvvvvvvvvvv");
                        OpenSecuritySettings.openSecuritySettings()
                    } else {
                        console.log("iosssssss",);
                        Linking.openURL('app-settings:')
                    }

                });
        }
    }





    render() {

        return (
            <View style={styles.container}>

                <View style={styles.customizedText}>
                    {/* <Icon
                            name="chevron-left"
                            type="font-awesome"
                            size={20}
                            onPress={() => {
                                if (this.props.navigation.state.params !== undefined) {
                                    this.props.navigation.navigate('Dashboard')
                                } else {
                                    BackHandler.exitApp()
                                }
                            }}
                        />*/}
                    <Text style={styles.customValidation}>Secure Your Wallet</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, bottom: hp('-1') }}>
                    <Image resizeMode={"cover"} style={{ width: wp('90'), height: hp('0.1'), tintColor: '#333333', top: hp('1'), right: hp('3') }} source={require('../../icons/line.png')} />
                    <Image resizeMode={"center"} style={styles.lockLogo} source={require('../../icons/lock.png')} />
                </View>
                <View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{marginLeft:wp('7%'),fontSize:16,fontWeight:'bold'}}>Setup your mobile phone's Screen lock</Text>
                        <Text style={{marginLeft:wp('7%'),marginRight:wp('7%'),marginTop:hp('1%')}}>To secure your data, you will be asked to unlock OyeWallet using your phone lock </Text>
                    </View>
                    <View style={{alignSelf:'center',marginTop:hp('5%')}}>
                        <Image resizeMode={"contain"}  source={require('../../icons/security.png')} />
                    </View>
                </View>
                <View style={{alignSelf:'center',marginTop:hp('7%')}}>
                    <TouchableOpacity onPress={() => this.selectSecurity()}>
                        <Text style={{color:base.theme.colors.orange}}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    };
}

const styles = StyleSheet.create({
    defaultAndCustom: {
        width: 12, height: 12, borderRadius: 12 / 2, borderWidth: 1, borderColor: base.theme.colors.black
    },
    defaultCustomView: {
        justifyContent: 'center', flexDirection: 'column', width: wp('80%'),
        alignSelf: 'center', alignItems: 'center', marginTop: hp('3%')
    },
    lockIcon: {
        alignItems: 'center', flexDirection: 'column', flex: 1, borderWidth: 0
    },
    lockLogo: {
        width: 80, height: 80, right: hp('7')
    },
    default: {
        width: wp('5%'), marginLeft: wp('15%')
    },
    customValidation: {
        fontSize: 16, color: base.theme.colors.black, left: hp('2')
    },
    container: {
        width: wp('100%'), height: hp('100%')
    },
    signUpIcon: {
        alignSelf: 'flex-end', marginTop: 0
    },
    customizedText: {
        position: 'absolute', marginTop: hp('2%'), marginLeft: wp('3%'), flexDirection: 'row'
    }
});

const mapStateToProps = state => {
    return {
        loggedIn: state.UserReducer.loggedIn,
        userDetails: state.UserReducer.userDetails
    };
};




export default connect(mapStateToProps, { updateUserInfo ,updateLoggedIn})(SecureWallet);
