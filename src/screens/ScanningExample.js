import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Image, PermissionsAndroid, BackHandler, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRScan from "./UserDetails/QRScan";

export default class DefaultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onSuccess = (e) => {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                {/*

          <RNCamera
           ref ={ref => {
               this.camera = ref;
           }}
           style ={{flex :1,width:'100%'}}
         /> */}
                {/* <Text>Hello</Text> */}
                {/* <View> */}
                <QRCodeScanner
                showMarker
                    onRead={this.onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                    cameraStyle={{ height: '100%' }}
                    customMarker={
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "transparent"
                        }}>
                            <Image source={require('../icons/scan.png')}/>
                            {/* <View style={{
                                flex: 1,
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'red',
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                            </View> */}
                        </View>

                    }
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
                {/* </View> */}
            </View>
        )
    }
}
