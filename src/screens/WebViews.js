import React,{Component} from 'react';
import {WebView} from 'react-native-webview';

class WebViews extends Component{
    render(){
        return(
          
            <WebView
          //  source ={{uri: 'http://192.168.254.85:4200/payment'}}
            source={{uri: 'https://test.ipg-online.com/connect/gateway/processing'}}
            />
         
        )
    }
}

export default WebViews;