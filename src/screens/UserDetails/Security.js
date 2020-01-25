import React, {Component, useReducer} from 'react';
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
    Linking, AsyncStorage, ImageBackground,
    TouchableOpacity,
} from "react-native";
import base from "../../base"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TouchID from 'react-native-touch-id';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { updateUserInfo,updateLoggedIn } from "../../actions";

import LocalAuth from 'react-native-local-auth';
import { connect } from 'react-redux'
// import { TouchableOpacity } from "react-native-gesture-handler";

class Security extends Component {
    constructor(props) {
        super(props);
        console.log("lockkk", this.props.navigation.state.params);
        let params = this.props.navigation.state.params ? this.props.navigation.state.params.authState : '';
        console.log("paramssss", params);
        this.state = {
            bodyText: 'OyeWallet is your personal cashback app.\n' +
                'Earn cashback for every purchase that you make in the stores near you.',
            // images: ['../icons/login_img.png', '../icons/Bills.png'],
            pressStatus: false,
            isButton: params !== 'authenticated',
            propsParam: params,
            authenticationType:null
        }
    }

    async onShowUnderlay() {
        let params = this.props.navigation.state.params ? this.props.navigation.state.params.authState : '';
        console.log("9999999999999 ", params);


        let authenticationType = await base.storage.retrieveData('authenticationType');
        let defaultAuthenticationType = await base.storage.retrieveData('defaultAuthenticationType');
        let customAuthenticationType = await base.storage.retrieveData('customAuthenticationType');

        console.log("SLNDKHBVD:", authenticationType, defaultAuthenticationType, customAuthenticationType);

        const { loggedIn } = this.props;
        console.log("Is User Logged in:", loggedIn)
        if (loggedIn && authenticationType !== null) {
            this.props.navigation.navigate("Dashboard");
        }
        else if (loggedIn && authenticationType === null) {
            this.props.navigation.navigate("DefaultOrCustom");

        }
        else {
            this.props.navigation.navigate("Otp");
        }
    }

    async componentDidMount() {
        console.log('pppppppppppppppp', this.props.loggedIn);
       // let authenticationType = await base.storage.retrieveData('authenticationType');
      //  let defaultAuthenticationType = await base.storage.retrieveData('defaultAuthenticationType');
       // let customAuthenticationType = await base.storage.retrieveData('customAuthenticationType');
       // this.setState({authenticationType:authenticationType})

       // console.log("Authentication type:", authenticationType);
       // console.log("Default Authentication type:", authenticationType);
       // console.log("Custom Authentication type:", authenticationType);

        let self = this;
        const optionalConfigObject = {
            title: 'Authentication Required', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: '',
            unifiedErrors: false,
            passcodeFallback: true,
        };
        TouchID.isSupported(optionalConfigObject).then(biometryType => {
            console.log("111111", biometryType);
            // Success code
            if (biometryType === 'FaceID') {
                this._pressHandler(this);
                console.log('FaceID is supported.');
            } else if (biometryType === 'TouchID') {
                this._pressHandler(this);
                //this.androidPassCode();
                //this.showAlert();
                console.log('TouchID is supported.');
            } else if (biometryType === true) {
                console.log('vvvvvv.');
                //this.showAlert();
                // this.androidPassCode();
                this.passCodeField();
            }
        })
            .catch(error => {
                if (Platform.OS === 'android') {
                    // this.androidPassCode();
                    this.passCodeField();
                }
                else {
                    this.passCodeFail();
                }

                console.log("hello", error);

                // this.showAlert();
            });


        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });
        }
    }

    showAndroidAlert() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
            return true;
        });
      //  AndroidOpenSettings.generalSettings()
    }

    componentWillUnmount() {
        let self = this;
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });
        }
    }
    passCodeFail() {
        if (Platform.OS === 'ios') {
            //Linking.canOpenURL('app-settings:')
            Linking.openURL('app-settings:')
        } else {
            this.showAndroidAlert()
        }
    }

    /* showAlert() {
         console.log("touchhhhh");
         Alert.alert(
             '',
             'Do you want to continue with Touch ID ?',
             [
                 {
                     text: 'Yes',
                     onPress: () => this.androidPassCode(),
                     style: 'cancel',
                 },
                 { text: 'No', onPress: () => this.passCodeAlert() },
             ],
             { cancelable: false },
         );
     }
     passCodeAlert() {
         console.log("passcodeeee");
         Alert.alert(
             '',
             'Do you want to continue with PassCode ?',
             [
                 {
                     text: 'Yes',
                     onPress: () => this.passCodeField(),
                     style: 'cancel',
                 },
                 { text: 'No', onPress: () => this.customPassword() }
             ],
             { cancelable: false },
         );
     }*/
    customPassword() {
        base.storage.storeData('authenticationType', 'Custom');
        this.props.navigation.navigate('PassCodeOrPin')
    }



    async passCodeField() {
        console.log("rrrrrrrrr");
        let self = this;
      //  base.storage.storeData('defaultAuthenticationType', 'Password');

        const {userDetails} = this.props;

        let data = userDetails;

        try{
            LocalAuth.authenticate({

                reason: 'this is a secure area, please authenticate yourself',
                fallbackToPasscode: true,    // fallback to passcode on cancel
                suppressEnterPassword: true // disallow Enter Password fallback
            })
                .then(success => {
                    self.setState({ isButton: false });
                    updateLoggedIn({ prop: 'loggedIn', value: true })
                    //self.props.navigation.navigate('Profile');
                    self.props.navigation.navigate('PayMerchant');

                })
                .catch(error => {
                    this.passCodeFail();
                    console.log("error", error);
                    // alert('Authentication Failed', error.message)
                })
        }
        catch (e) {
            console.log((e))
        }

    }

    androidPassCode() {
       // base.storage.storeData('defaultAuthenticationType', 'TouchId');
        let self = this;
        console.log("Hitting");
        try {
            TouchID.authenticate('', { passcodeFallback: true })
                .then(success => {
                    console.log("successsss", success);
                    self.setState({ isButton: false });
                    updateLoggedIn({ prop: 'loggedIn', value: true })
                   // self.props.navigation.navigate('Dashboard');
                    //alert('Authenticated Successfully')

                })

                .catch(error => {
                    console.log("Errror:", error);
                    // Failure code
                    LocalAuth.authenticate({
                        reason: 'this is a secure area, please authenticate yourself',
                        fallbackToPasscode: true,    // fallback to passcode on cancel
                        suppressEnterPassword: true // disallow Enter Password fallback
                    })
                        .then(success => {
                            console.log("Success:", success);
                            self.setState({ isButton: false });
                            updateUserInfo({ prop: 'loggedIn', value: true })
                           // self.props.navigation.navigate('Dashboard');
                            //alert('Authenticated Successfully')
                        })
                        .catch(error => {
                            this.passCodeFail();
                            console.log("pass error ");
                        })

                });
        } catch (e) {
            console.log(e)
        }
    }



    _pressHandler(self) {
        const optionalConfigObject = {
            title: 'Authentication Required', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: '',
            unifiedErrors: false,
            passcodeFallback: true,

        };
        const {userDetails} = this.props;
        let data = userDetails;
        TouchID.authenticate('OyeWallet', optionalConfigObject)
            .then(success => {
                //alert('Authenticated Successfully');
                self.setState({ isButton: false });
                updateLoggedIn({ prop: 'loggedIn', value: true })
               // self.props.navigation.navigate('Profile');
                self.props.navigation.navigate('PayMerchant');


            })
            .catch(error => {
                if (Platform.OS === 'android') {
                    BackHandler.exitApp();
                }
                else {
                    Alert.alert(
                        '',
                        //'Authentication failed',
                        [{ text: 'Retry', onPress: () => self._pressHandler(self) }],
                        { cancelable: false }
                    )
                }
                console.log("aaaaaaa", error);

            });
    };
    render() {
        console.log("reducerrrr", this.props);
        let authenticationType = this.state.authenticationType;
        return (
            <View style={{backgroundColor:base.theme.colors.blue}}></View>

        )
    };
}

const styles = StyleSheet.create(
    {
        backgroundContainer:
            {
                flex: 1,
                // backgroundColor: base.theme.colors.primart1,
                // resizeMode: 'cover',
                // resizeMode: 'stretch',width:'100%',height:'100%'
                // position: 'relative'
            },
        ButtonContainer:
            {
                width: wp('40%'),
                backgroundColor: base.theme.colors.orange,
                opacity: 0.8
            },
        ButtonContainer1:
            {
                width: wp('40%'),
                backgroundColor: base.theme.colors.primary
            },
        welcomeText: {
            alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
        }

    }
);


const mapStateToProps = state => {
    return {
        loggedIn: state.UserReducer.loggedIn,
    };
};

export default connect(mapStateToProps, { updateUserInfo,updateLoggedIn })(Security);