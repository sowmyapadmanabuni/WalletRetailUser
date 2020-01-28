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
            TransactionDetail: TransactionDetail

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
            this.props.navigation.navigate(loggedIn ? 'Security':'Auth');
        })
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
           //let token =  (/\d{1,6}$/).exec(url);            
           //Actions.Password({token:token})
       }
   }
   componentWillUnmount(){
    // Remove the listener
    //Linking.removeEventListener('url', this.appWokeUp);
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

