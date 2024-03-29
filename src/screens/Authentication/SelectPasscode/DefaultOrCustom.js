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
    Alert,AppState,
    TouchableOpacity,
    AsyncStorage, Linking,
} from 'react-native';
import base from "../../../base";
//import storage from "../../../utils/storage";
import Button from '../../../components/common/Button';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from "react-native-cardview";
import { updateUserInfo,updateLoggedIn } from "../../../actions";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";
import OpenSecuritySettings from 'react-native-open-security-settings';
import LocalAuth from 'react-native-local-auth';
import {UPDATE_lOGGEDIN} from "../../../actions/types";
//import PasscodeAuth from 'react-native-passcode-auth';
//import PasscodeAuth from 'react-native-passcode-auth';

class DefaultOrCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressStatus: false,
            isButton: true,
            pp: '',
            appState: AppState.currentState,
            isChecking:false,
            isVerified:false

        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
          this.foregroundHandle()
        }else{
            console.log("App in background")
        }
        this.setState({appState: nextAppState});
    }

    foregroundHandle(){
        let self = this;
        this.setState({isChecking:true},()=>{
            self.checkAuth()
        })
    }

    async checkAuth(){
        let self = this;

        if(Platform.OS==='android'){
            console.log("Checking defaultSecurity")
            let isSecure = await OpenSecuritySettings.isDeviceSecure()
            console.log("OpenSecuritySettings.isDeviceSecure",isSecure)
            if(isSecure){
               self.setState({isChecking:false})
            }else{
                AppState.removeEventListener('change', self._handleAppStateChange);
                self.props.navigation.navigate('SecureWallet')
            }
        }else {


            
            const optionalConfigObject = {               
                unifiedErrors: false,
                passcodeFallback: true,
            };
            TouchID.isSupported(optionalConfigObject).then(biometryType => {
                console.log("111111", biometryType);
                self.setState({isChecking:false})
            })
                .catch(error => {
                    console.log("errorSecurityJS", error.name);
                    AppState.removeEventListener('change', self._handleAppStateChange);
                    self.props.navigation.navigate('SecureWallet')
                });

        }
    }



    componentDidMount() {
            AppState.addEventListener('change', this._handleAppStateChange);
        this.BackHandler =  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        // BackHandler.exitApp()

        if (Platform.OS === 'android') {
            /*  var doubleClick = BackHandler.addEventListener('hardwareBackPress', () => {
                      BackHandler.exitApp()
                  });
                  setTimeout(
                      () => {
                          doubleClick.remove()
                      },
                      1500
                  );*/

            BackHandler.exitApp()


        }
        return true ;

    }
    componentWillUnmount() {
        try{
            AppState.removeEventListener('change', this._handleAppStateChange);
            BackHandler.remove();
        }catch(e){
            console.log(e)
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

    _defaultSecurity(){
        base.storage.storeData('secureStatus','default')
        this.props.navigation.navigate("Security")
    }

    async onSuccessAuth(){
        let self= this;
       // const { userDetails } = this.props;
       // let data = userDetails;
        updateLoggedIn({ prop: 'loggedIn', value: true })

        self.props.navigation.navigate('PayMerchant');


    }


    async defaultSecurity() {
        let self = this;
        const optionalConfigObject = {
            unifiedErrors: false,
            passcodeFallback: true,
        };
        //const { userDetails } = this.props;
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
                if (Platform.OS === 'ios') {
                    // if(biometryType != 'TouchID' && biometryType != 'FaceID'){
                    //     self.setState({isVerified:true})
                    // }
                    TouchID.authenticate('OyeWallet', optionalConfigObject)
                        .then(async success => {
                            //self.setState({isVerified:true})
                            console.log("Authenticated Successfully")                            
                            self.onSuccessAuth();
                            //self.props.navigation.navigate('PayMerchant');
                        })
                        .catch((e) => {
                            self.setState({isVerified:false})
                        })
                } else {
                    self.passCodeField()
                }

            })
                .catch(error => {
                    if (Platform.OS == 'android') {
                        console.log("vvvvvvvvvvv");
                        OpenSecuritySettings.openSecuritySettings()
                    } else {
                        console.log("iosssssss",error.name);
                        //if(error.name != 'LAErrorUserCancel') {
                        Linking.openURL('app-settings:')
                        //}

                    }

                });
        }

    }

    async passCodeField() {
        console.log("passCodeFieldpassCodeFieldpassCodeFieldpassCodeField");
        let self = this;
        //     base.storage.storeData('defaultAuthenticationType', 'Password');

       // const { userDetails } = this.props;

       // let data = userDetails;

        try {
            LocalAuth.authenticate({

                reason: 'this is a secure area, please authenticate yourself',
                fallbackToPasscode: true,    // fallback to passcode on cancel
                suppressEnterPassword: true // disallow Enter Password fallback
            })
                .then(async success => {
                    let self= this;
                    self.setState({ isButton: false });
                   // updateUserInfo({ prop: 'loggedIn', value: true })
                    // const { userDetails } = this.props;
                    // let data = userDetails;

                    updateLoggedIn({ prop: 'loggedIn', value: true })

                    self.props.navigation.navigate('PayMerchant');

                })
                .catch(error => {
                    BackHandler.exitApp()

                    //this.passCodeFail();
                    console.log("error", error);
                    // alert('Authentication Failed', error.message)
                })
        }
        catch (e) {
            console.log((e))
            BackHandler.exitApp()

        }

    }

    render() {

        return (
            <View style={styles.container}>
                {
                    
                <View>
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
                    <Image resizeMode={"cover"} style={{ width: wp('90'), height: hp('0.1'), tintColor: '#333333', top: hp('1'), right: hp('3') }} source={require('../../../icons/line.png')} />
                    <Image resizeMode={"center"} style={styles.lockLogo} source={require('../../../icons/lock.png')} />
                </View>
                <View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{marginLeft:wp('7%'),fontSize:16,fontWeight:'bold'}}>Enter your mobile phone's Screen lock</Text>
                        <Text style={{marginLeft:wp('7%'),marginRight:wp('7%'),marginTop:hp('1%')}}>To secure your data, you will be asked to unlock OyeWallet using your phone lock </Text>
                    </View>
                    <View style={{alignSelf:'center',marginTop:hp('5%')}}>
                        <Image resizeMode={"contain"}  source={require('../../../icons/security.png')} />
                    </View>
                </View>
                <View style={{alignSelf:'center',marginTop:hp('7%')}}>
                    <TouchableOpacity onPress={() => this.defaultSecurity()}>
                        <Text style={{color:base.theme.colors.primart1}}>NEXT</Text>
                    </TouchableOpacity>
                </View>
                </View>
            }
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




export default connect(mapStateToProps, { updateUserInfo , updateLoggedIn})(DefaultOrCustom);
