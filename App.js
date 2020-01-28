/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Provider} from 'react-redux';
import store from './src/store';
import Navigation from './src/Navigation';
import EnterOTP from './src/screens/Auth/EnterOTP';
import PayMerchant from './src/screens/UserDetails/PayMerchant';
// import Start from './src/screens/Start';
import ScanningExample from './src/screens/ScanningExample';
import Amount from './src/screens/UserDetails/Amount';
import QRScan from './src/screens/UserDetails/QRScan';
import CardDetails from './src/screens/PaymentGateWay/CardDetails';
import SignUp from './src/screens/Auth/SignUp';
import GetOTP from './src/screens/Auth/GetOTP';
import WebViews from './src/screens/WebViews';
import TransactionDetail from './src/screens/UserDetails/TransactionDetail'
import { StatusBarPlaceHolder } from './StatusBarPlaceHolder';
import FlashMessage from "react-native-flash-message";

class App extends React.Component {
  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.warn(barcode.data))
  };
  render(){
    console.log("app.......")
  return (
      // <SafeAreaView style ={{flex:1}}>
       <Provider store ={store}>
       {/* <PayMerchant /> */}
      <StatusBarPlaceHolder />
      <FlashMessage position="top" />
         <Navigation/>
       {/* <ScanningExample/> */}
       
       </Provider>
      // </SafeAreaView>
  
  );
  }
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
