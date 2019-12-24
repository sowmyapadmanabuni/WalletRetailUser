import React,{Component} from 'react';
import { View,Text,TouchableOpacity,Linking, } from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class DefaultScreen extends Component {
constructor(props){
    super(props);
    this.state={}
}

onSuccess = (e) => {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }
 
    render() {
        return (
           <View style={{flex:1}}>
          

{/* 
          <RNCamera
          
           ref ={ref => {
               this.camera = ref;
           }}
           style ={{flex :1,width:'100%'}}
         /> */}
          {/* <Text>Hello</Text> */}
         
          <View>
   <QRCodeScanner
   onRead={this.onSuccess}
   flashMode={RNCamera.Constants.FlashMode.torch}      
//    topContent={
//      <Text>
//        Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
//      </Text>
//    }
//    bottomContent={
//      <TouchableOpacity>
//        <Text>OK. Got it!</Text>
//      </TouchableOpacity>
//    }
 />
 </View>
           </View>
        )
    }
}