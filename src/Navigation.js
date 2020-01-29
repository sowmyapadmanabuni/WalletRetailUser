import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { View, ActivityIndicator,AsyncStorage,Linking } from 'react-native';
import { persistStore } from 'redux-persist';
import store from './store';
import CardDetails from './screens/PaymentGateWay/CardDetails';
import EnterOTP from './screens/Auth/EnterOTP';
import GetOTP from './screens/Auth/GetOTP';
import SignUp from './screens/Auth/SignUp';
import Start from './screens/Start';
import WebViews from './screens/WebViews';
import React from 'react';
import PayMerchant from './screens/UserDetails/PayMerchant';
import QRScan from './screens/UserDetails/QRScan';
import ScanningExample from './screens/ScanningExample';
import Amount from './screens/UserDetails/Amount';
import Profile from './screens/UserDetails/Profile';
import Statement from './screens/UserDetails/Statement';
//import BankDetail from './screens/UserDetails/BankDetail';
import DefaultOrCustom from "./screens/Authentication/SelectPasscode/DefaultOrCustom";
import SecureWallet from "./screens/UserDetails/SecureWallet";
import Security from './screens/UserDetails/Security';
// import PaymentMethod from './screens/UserDetails/PaymentMethod';
import PassCodeOrPin from "./screens/Authentication/SelectPasscode/PasscodeOrPin";
import Credit from './screens/UserDetails/Credit.js'
import Debit from './screens/UserDetails/Debit.js'
import TransactionDetail from './screens/UserDetails/TransactionDetail'
import CreatePin from "./screens/Authentication/CreatePin/CreatePin";
import CreatePassWord from "./screens/Authentication/CreatePasscode/CreatePassword";
import ConfirmPassWord from "./screens/Authentication/CreatePasscode/ConfirmPassword";
import ConfirmPin from "./screens/Authentication/CreatePin/ConfirmPin";
import EnterPassCode from "./screens/Authentication/CreatePasscode/EnterPasscode";
import EnterPin from "./screens/Authentication/CreatePin/EnterPin";
import base from './base';

import TouchID from 'react-native-touch-id';
import AndroidOpenSettings from 'react-native-android-open-settings';
import OpenSecuritySettings from 'react-native-open-security-settings';


import LocalAuth from 'react-native-local-auth';

const DashStack = createStackNavigator({
    CardDetails: { screen: CardDetails }
}, {
    headerMode: "none"
});



    const AuthStack = createStackNavigator({

            Launch: {
                screen: Start,
                navigationOptions: ({}) => ({
                    title: "Start",
                    gesturesEnabled:false
                })
            },
            Start:Start,
            Signup: {screen: SignUp,navigationOptions: {
                gesturesEnabled: false,
            },},
            PaymentWeb: {screen: WebViews},
            Otp: {screen: GetOTP,navigationOptions: {
                gesturesEnabled: false,
            },},
            EnterOtp: {screen: EnterOTP,navigationOptions: {
                gesturesEnabled: false,
            },},
            PayMerchant: PayMerchant,
            WebView: WebViews,
            QR: QRScan,
            Scanned: ScanningExample,
            Amount: {screen:Amount,navigationOptions: {
                gesturesEnabled: false,
            }},
            CardDetails: CardDetails,
            Profile: Profile,
            Statement: Statement,
            //BankDetail: BankDetail,
            //ChangePassword: ChangePassword,
            //PaymentMethod: PaymentMethod,
            DefaultOrCustom : DefaultOrCustom,
            SecureWallet:SecureWallet,
            Security:Security,
            PassCodeOrPin:PassCodeOrPin,
            CreatePassword:CreatePassWord,
            ConfirmPassWord:ConfirmPassWord,
            CreatePin:CreatePin,
            Credit: Credit,
            ConfirmPin:ConfirmPin,
            EnterPassCode:EnterPassCode,
            EnterPin:EnterPin,
            Debit: Debit,
            TransactionDetail: TransactionDetail,

        },
        {
            headerMode: 'none'
        })


const SignupStack = createStackNavigator({
    signup: { screen: SignUp },
}, { headerMode: 'none' })

class InitScreen extends React.PureComponent {
    componentDidMount() {
        Linking.getInitialURL()
        .then((url) => {
          if (url) {
              console.log("EXTERNAL_URL",url)
            this.handleExternalLink(url)
          }
        })
        .catch((e) => {})

   Linking.addEventListener('url', this.appWokeUp);

        persistStore(store, null, () => {
            const { loggedIn } = this.props;
            console.log("AUTHINNAVIGATION",loggedIn,this.props)
            if(!loggedIn){
                AsyncStorage.clear();
            }
            if(loggedIn){
                this.selectSecurity()
            }
            else{
                this.props.navigation.navigate('Auth')
            }
            //this.props.navigation.navigate(loggedIn ? 'Security':'Auth');
        })
    }

    selectSecurity() {
        let self = this;
        const optionalConfigObject = {
            unifiedErrors: false,
            passcodeFallback: true,
        };
        //const { userDetails } = this.props;
        //let data = userDetails;
        console.log("selectSecurity")
        TouchID.isSupported(optionalConfigObject).then(biometryType => {
            console.log("selectSecurity", biometryType);
            this.props.navigation.navigate('Security')
        })
            .catch(async error => {
                console.log("errorSecurityJSNAVIG", error.code);
                if(Platform.OS==='android'){
                    console.log("Checking defaultSecurity")
                    let isSecure = await OpenSecuritySettings.isDeviceSecure()
                    console.log("OpenSecuritySettings.isDeviceSecure",isSecure)
                    if(!isSecure){
                        this.props.navigation.navigate('Security')

                       // this.props.navigation.navigate('SecureWallet')
                    }else{
                        if(error.code == 'NOT_ENROLLED'){
                            this.props.navigation.navigate('Security')
                        }else {
                            this.props.navigation.navigate('DefaultOrCustom')
                        }
                    }
                }else{
                    //if(error.name == 'LAErrorPasscodeNotSet'){
                    this.props.navigation.navigate('SecureWallet')
                    // }else{
                    //     this.props.navigation.navigate('SecureWallet')
                    // }
                }

            });
    }
    appWokeUp = (event) => {
        //alert('Linking Listener'+'url  ' + event.url)
        console.log("EXTERNAL_URL_APPWOKE",event)
        this.handleExternalLink(event.url)
     }

   handleExternalLink(url){
        console.log("EXTERNAL_URL_HANDLE",url)
       if(url.indexOf("qrcode") != -1){
           console.log(url)
           this.handleQRCode(url)
       }
   }
   componentWillUnmount(){
    Linking.removeEventListener('url', this.appWokeUp);
  }

  handleQRCode(qrData){
    const { loggedIn } = this.props;
    if(loggedIn){

        var idString = qrData.match(/(id=)\w+/g);
        if(idString.length > 0){
            idString = idString[0]
            console.log(idString)
            if(idString.indexOf("id=") != -1){
                idString = idString.replace("id=","");
                this.processMerchant(idString)
            }
        }
    }
  }

  async processMerchant(merchantId){
    this.setState({isLoading:true})
    let merchResp = await base.service.api.getMerchant(merchantId);
    this.setState({isLoading:false})
    console.log(merchResp)
    if(merchResp.data != undefined && merchResp.data.errorMessage == undefined){

        let merchant = merchResp.data;
        let mobMerchant = merchant.mobileNumber;
        let storeName = merchant.brandName;
        if(mobMerchant != undefined){
            //console.log(merchant.mobileNumber)
            this.props.navigation.navigate('Amount',{storeName:storeName,mobileNumber:mobMerchant})
        }else{
            //this.showQRError('Merchant Not Found')
            //this.reactivateScanner();
        }
    }else{
        //this.showQRError('Merchant Not Found')

    }
}

render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.UserReducer.loggedIn,
        userReducer:state.UserReducer
    };
};

const LoadingContent = connect(mapStateToProps)(InitScreen);

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: LoadingContent,
            App: DashStack,
            Auth: AuthStack,
            Signup: SignupStack,
        },
        {
            initialRouteName: 'AuthLoading'
        }
    )
);

export default AppNavigator;

