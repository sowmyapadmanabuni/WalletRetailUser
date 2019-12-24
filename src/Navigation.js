import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
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


const DashStack = createStackNavigator({
CardDetails : {screen: CardDetails}
},{
    headerMode : "none"
})

const AuthStack = createStackNavigator({
    Launch:{
        screen:Start,
        navigationOptions:({})=>({
            title:"Start"
        })
    },
    PaymentWeb      : {screen: WebViews},
    Otp             : {screen:GetOTP},
    EnterOtp        : {screen:EnterOTP},
    PayMerchant     : PayMerchant,
    WebView         : WebViews,
    QR              : QRScan,
    Scanned         : ScanningExample,
    Amount          : Amount,
    CardDetails     : CardDetails,
},
{
    headerMode:'none'
})

const SignupStack = createStackNavigator({
    signup:{screen:SignUp},
  }, { headerMode: 'none'})

class InitScreen extends React.PureComponent{
    componentDidMount(){
        persistStore(store,null,() =>{
            const{ loggedIn } = this.props;
            this.props.navigation.navigate('Auth');
        })
    }

    render(){
        return(
            <View style ={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return{loggedIn:state.UserReducer.loggedIn,
    };
};

const LoadingContent = connect(mapStateToProps)(InitScreen);

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading : LoadingContent,
            App:DashStack,
            Auth:AuthStack,
            Signup: SignupStack,
           
        },
        {
            initialRouteName:'AuthLoading'
        }
    )
);

export default AppNavigator;
 
        